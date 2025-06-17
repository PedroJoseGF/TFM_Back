const Procedure = require('../models/Procedure');

async function getProcedures(filters) {
    try {
        let procedures = [];
        if (Object.keys(filters).length !== 0) {
            procedures = await Procedure.find({
                $and: [
                    { title: { $regex: filters.title, $options: "i" } },
                    { proceeding: { $regex: filters.proceeding, $options: "i" } },
                    { type: { $regex: filters.type, $options: "i" } },
                    { status: { $regex: filters.status, $options: "i" } },
                ],
            });
        } else {
            procedures = await Procedure.find();
        }
        return procedures;
    } catch (err) {
        console.error('Error al obtener los expedientes:', err);
        throw err;
    }
};

async function getProceduresById(id) {
    try {
        let procedures = [];
        procedures = await Procedure.find({ user: id });
        return procedures;
    } catch (err) {
        console.error('Error al obtener los expedientes:', err);
        throw err;
    }
};

const createProcedure = async (procedureData) => {
    const { file, type, ...rest } = procedureData;

    let typeProceeding = '';
    switch (type) {
        case "claims":
            typeProceeding = "C&R/";
            break;
        
        case "majorWorksLicense":
            typeProceeding = "MWL/";
            break;
        
        case "executionMinorWorks":
            typeProceeding = "EMW/";
            break;
        
        case "populationRegister":
            typeProceeding = "PR/";
            break;

        default:
            typeProceeding = "";
    }

    let proceeding = await Procedure.countDocuments({ $and: [ {proceeding: { $regex: typeProceeding, $options: "i" }}, { proceeding: { $regex: new Date().getFullYear(), $options: "i" }} ]}).exec();

    const procedure = new Procedure({
        filename: file,
        proceeding: typeProceeding + (proceeding + 1) + '/' + new Date().getFullYear(),
        type,
        ...rest
    });

    await procedure.save();
    return procedure;
};

async function updateProcedure(id, procedureData) {
    try {
        procedureData.lastUpdate = new Date();
        
        const procedure = await Procedure.findByIdAndUpdate(
            id,
            procedureData,
            { 
                new: true,
                runValidators: true
            }
        );

        if (!procedure) {
            throw new Error('Expediente no encontrado');
        }

        console.log('Expediente actualizado:', procedure);
        return procedure;
    } catch (err) {
        console.error('Error al actualizar el expediente:', err);
        throw err;
    }
}

const deleteProcedure = async (_id) => {
    const procedure = await Procedure.findOne({_id});
    if(!procedure) {
        throw new Error('Expediente no encontrado');
    }
    await Procedure.findByIdAndDelete(procedure._id);
    return true;
};

module.exports = { getProcedures, getProceduresById, createProcedure, updateProcedure, deleteProcedure };