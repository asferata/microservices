const {Program: ProgramModel} = require('./mongoose');
const {Validation} = require('@dataValidation/');

async function findChildTree(paths, ids) {
    let program = await findProgram(ids[0]);
    ids.shift();

    return paths.reduce((acc, cur, idx) => {
        if(!acc) {
            return null;
        }

        let value = acc[acc.length - 1][cur];
        if(idx < ids.length) {
            value = value.id(ids[idx]);
        }

        if(!value) {
            return null;
        }

        acc.push(value);
        return acc;
    }, [program]);
}

async function findChild(paths, ids) {
    let result = await findChildTree(paths, ids);
    return result ? result[result.length - 1] : null;
}

// async function findChild(paths, ids) {
//     let program = await findProgram(ids[0]);
//     ids.shift();
//
//     return paths.reduce((acc, cur, idx) => {
//         let value = acc[cur];
//         if(idx < ids.length) {
//             value = value.id(ids[idx]);
//         }
//
//         return value;
//     }, program);
// }

// async function findChild(paths, ids) {
//     // let program = await findProgram(ids[0]);
//     // ids.shift();
//
//     paths.unshift(null);
//     return paths.reduce(async (acc, cur, idx) => {
//         if(acc == null) {
//             return await findProgram(ids[idx]);
//         }
//
//         let value = acc[cur];
//         if(idx < ids.length) {
//             value = value.id(ids[idx]);
//         }
//
//         return value;
//     }, null);
// }

async function createChild(paths, ids, child) {
    let tree = await findChildTree(paths, ids);
    if(!tree) {
        return null;
    }

    let dbChildren = tree[tree.length - 1];

    dbChildren.push(child);
    await tree[0].save();
    return dbChildren[dbChildren.length - 1];
}

async function updateChild(paths, ids, child, additional) {
    let tree = await findChildTree(paths, ids);
    if(!tree) {
        return null;
    }

    let dbChild = tree[tree.length - 1];
    if(additional) {
        additional(dbChild);
    }

    dbChild.set(child);
    await tree[0].save();
}

async function removeChild(paths, ids) {
    let tree = await findChildTree(paths, ids);
    if(!tree) {
        return null;
    }

    let dbChild = tree[tree.length - 1];
    dbChild.remove();
    await tree[0].save();
}

// async function findProgram(id) {
//     return await ProgramModel.findById(id);
// }

async function findProgram(id) {
    if(id) {
        return await ProgramModel.findById(id);
    }

    return await ProgramModel.find();
}

const toJson = func => {
    return async (...rest) => {
        let result = await func(...rest);
        return result ? result.toJSON() : null;
    };
};

const toJsonArray = func => {
    return async (...rest) => {
        let result = await func(...rest);
        return result ? result.map(x => x.toJSON()) : [];
    };
};

//--------------------------------

// async function list() {
//     let programs = await ProgramModel.find();
//     return programs ? programs.map(x => x.toJSON()) : null;
// }

async function list() {
    return await ProgramModel.find();
}

// async function get(id) {
//     let program = await findProgram(id);
//     return program ? program.toJSON() : null;
// }

async function get(id) {
    return await ProgramModel.findById(id);
}

async function add(program) {
    let createdProgram = await ProgramModel.create(program);
    return get(createdProgram.id);
}

async function update(id, program) {
    await ProgramModel.updateOne({_id: id}, {$set: {...program}});
    // return get(id);
}

async function remove(id) {
    const result = await ProgramModel.deleteOne({_id: id});
    return result.n !== 0;
}

//----------------------------------------

// async function listExercises(id) {
//     let program = await findProgram(id);
//     return program ? program.exercises.map(x => x.toJSON()) : [];
// }

async function listExercises(id) {
    return findChild(['exercises'], [id]);
}

// async function getExercise(id, exerciseId) {
//     let exercise = await findExercise(id, exerciseId);
//     return exercise ? exercise.toJSON() : null;
// }

async function getExercise(id, exerciseId) {
    return findChild(['exercises'], [id, exerciseId]);
}

// async function addExercise(id, exercise) {
//     let program = await findProgram(id);
//     if(!program) {
//         return null;
//     }
//
//     program.exercises.push(exercise);
//     await program.save();
//     let createdExercise = program.exercises[program.exercises.length - 1];
//     return createdExercise.toJSON();
// }

async function addExercise(id, exercise) {
    return createChild(['exercises'], [id], exercise);
}

// async function updateExercise(id, exerciseId, exercise) {
//     let program = await findProgram(id);
//     if(!program) {
//         return null;
//     }
//
//     let dbExercise = program.exercises.id(exerciseId);
//     if(!dbExercise) {
//         return null;
//     }
//
//     // update iterations
//     updateIterations(exercise, dbExercise);
//     delete(exercise.iterations);
//     dbExercise.set(exercise);
//
//     await program.save();
//     return dbExercise.toJSON();
// }

async function updateExercise(id, exerciseId, exercise) {
    await updateChild(['exercises'], [id, exerciseId], exercise, updateIterations(exercise));
}

// function updateIterations(exercise, dbExercise) {
//     let iterationsIds = exercise.iterations.map(x => x.id);
//     let dbIterationsIds = dbExercise.iterations.map(x => x.id);
//     dbExercise.iterations.forEach(x => {
//         if (!iterationsIds.includes(x.id)) {
//             dbExercise.iterations.id(x.id).remove();
//         } else {
//             dbExercise.iterations.id(x.id).set(exercise.iterations.find(i => i.id === x.id));
//         }
//     });
//
//     exercise.iterations.filter(x => !dbIterationsIds.includes(x.id)).forEach(x => dbExercise.iterations.add(x));
//     delete(exercise.iterations);
// }

function updateIterations(exercise) {
    return dbExercise => {
        let iterationsIds = exercise.iterations.map(x => x.id);
        let dbIterationsIds = dbExercise.iterations.map(x => x.id);
        dbExercise.iterations.forEach(x => {
            if (!iterationsIds.includes(x.id)) {
                dbExercise.iterations.id(x.id).remove();
            } else {
                dbExercise.iterations.id(x.id).set(exercise.iterations.find(i => i.id === x.id));
            }
        });

        exercise.iterations.filter(x => !dbIterationsIds.includes(x.id)).forEach(x => dbExercise.iterations.add(x));
        delete (exercise.iterations);
    }
}

// async function removeExercise(id, exerciseId) {
//     let program = await findProgram(id);
//     if(!program) {
//         return null;
//     }
//
//     let dbExercise = program.exercises.id(exerciseId);
//     if(!dbExercise) {
//         return null;
//     }
//
//     dbExercise.remove();
//     await program.save();
// }

async function removeExercise(id, exerciseId) {
    await removeChild(['exercises'], [id, exerciseId]);
}

//----------------------------------------



// async function listIterations(id, exerciseId) {
//     let exercise = await findExercise(id, exerciseId);
//     return (exercise && exercise.iterations) ? exercise.iterations.map(x => x.toJSON()) : [];
// }

async function listIterations(id, exerciseId) {
    return findChild(['exercises', 'iterations'], [id, exerciseId]);
}

// async function getIteration(id, exerciseId, iterationId) {
//     let iteration = await findIteration(id, exerciseId, iterationId);
//     return iteration ? iteration.toJSON() : null;
// }

async function getIteration(id, exerciseId, iterationId) {
    return findChild(['exercises', 'iterations'], [id, exerciseId, iterationId]);
}

// async function addIteration(id, exerciseId, iteration) {
//     let program = await findProgram(id);
//     if(!program) {
//         return null;
//     }
//
//     let exercise = program.exercises.id(exerciseId);
//     if(!exercise) {
//         return null;
//     }
//
//     exercise.iterations.push(iteration);
//     await program.save();
//     let createdIteration = exercises.iterations[exercise.iterations.length - 1];
//     return createdIteration.toJSON();
// }

async function addIteration(id, exerciseId, iteration) {
    return createChild(['exercises', 'iterations'], [id, exerciseId], iteration);
}

// async function updateIteration(id, exerciseId, iterationId, iteration) {
//     let program = await findProgram(id);
//     if(!program) {
//         return null;
//     }
//
//     let exercise = program.exercises.id(exerciseId);
//     if(!exercise) {
//         return null;
//     }
//
//     let dbIteration = exercise.iterations.id(iterationId);
//     if(!dbIteration) {
//         return null;
//     }
//
//     dbIteration.set(iteration);
//
//     await program.save();
//     return dbIteration.toJSON();
// }


async function updateIteration(id, exerciseId, iterationId, iteration) {
    await updateChild(['exercises', 'iterations'], [id, exerciseId, iterationId], iteration);
}

// async function removeIteration(id, exerciseId, iterationId) {
//     let program = await findProgram(id);
//     if(!program) {
//         return null;
//     }
//
//     let exercise = program.exercises.id(exerciseId);
//     if(!exercise) {
//         return null;
//     }
//
//     let iteration = exercise.iterations.id(iterationId);
//     if(!iteration) {
//         return null;
//     }
//
//     iteration.remove();
//     await program.save();
// }

async function removeIteration(id, exerciseId, iterationId) {
    await removeChild(['exercises', 'iterations'], [id, exerciseId, iterationId]);
}

const Program = {
    list: toJsonArray(list),
    get: Validation.withIdValidation(toJson(get)),
    add: toJson(add),
    update : Validation.withIdValidation(update),
    remove: Validation.withIdValidation(remove),
    listExercises: Validation.withIdValidation(toJsonArray(listExercises)),
    getExercise: Validation.withIdValidation(toJson(getExercise)),
    addExercise: Validation.withIdValidation(toJson(addExercise)),
    updateExercise: Validation.withIdValidation(updateExercise),
    removeExercise: Validation.withIdValidation(removeExercise),

    listIterations: Validation.withIdValidation(toJsonArray(listIterations)),
    getIteration: Validation.withIdValidation(toJson(getIteration)),
    addIteration: Validation.withIdValidation(toJson(addIteration)),
    updateIteration: Validation.withIdValidation(updateIteration),
    removeIteration: Validation.withIdValidation(removeIteration)
};

module.exports = Program;