const userModel = require('../models/userModel')
const fileModel = require("../models/fileModel")
const fs = require('fs').promises;
const path = require('path');



const uploadFileCtrl = async (req, res) => {
    try {
        const { userId } = req.body;
        const docName = req.file.filename;
        const pin = generateUniquePin();
        console.log('userId is' + userId)
        console.log('docName is' + docName)
        console.log('pin is' + pin)
        const newDoc = new fileModel({ docName: docName, userId: userId, pin: pin, })
        await newDoc.save();
        res.status(201).send({ success: true, message: `Got data`, data: pin })
    } catch (error) {
        res.status(500).send({ success: false, message: `${error}` })
    }
}

function generateUniquePin() {
    // Generate a random 6-digit number
    const min = 100000;
    const max = 999999;
    return Math.floor(min + Math.random() * (max - min));
}

const showAllDocument = async (req, res) => {
    const userId = req.query.userId;
    try {
        const fetchDocs = await fileModel.find({ userId: userId });
        console.log(`Number of docs associated with user ${userId} are: ${fetchDocs.length}`);
        res.status(200).send({ success: true, message: 'Data fetched successfully', data: fetchDocs });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: `Error - ${error}` })
    }
}

const deleteFile = async (req, res) => {
    const docId = req.query.docId;
    const docName = req.query.docName;
    try {
        const deleteDoc = await fileModel.deleteOne({ _id: docId })
        if (deleteDoc.deletedCount === 1) {
            const filePath = path.join(__dirname, '..', 'uploads', docName);
            // Delete the file
                try {
                    await fs.unlink(filePath);
                    console.log(`File ${docName} deleted successfully`);
                    res.status(200).send({ success: true, message: `File Deleted ${docName} Successfully` });
                } catch (error) {
                    console.error('Error deleting file:', error);
                    return res.status(500).send({ success: false, message: 'Error deleting file' });
                }
        } else {
            // Document not found in database
            return res.status(404).send({ success: false, message: 'Document not found' });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: `File Deletion failed because of ${error}` })
    }
}



module.exports = { uploadFileCtrl, showAllDocument, deleteFile }