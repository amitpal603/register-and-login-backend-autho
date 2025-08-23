const  uploadImageToCloudinary = require('../Helper/cloudinaryHelper')
const Image = require('../models/imageSchema.model')


const uploadImage = async(req,res) => {
    try {
        if(!req.file){
            res.status(400).json({
                success: false,
                message:'File are required ? please upload Image'
            })
        }

        const {url,publicId} =  await uploadImageToCloudinary(req.file.path)

        const newImage = new Image({url,publicId,uploadedBy:req.userInfo.userId})
        await newImage.save()

        res.status(201).json({
            success:true,
            message:'Image uploaded successFully',
            image:newImage
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

module.exports = uploadImage