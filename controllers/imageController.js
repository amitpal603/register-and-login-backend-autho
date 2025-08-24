const  uploadImageToCloudinary = require('../Helper/cloudinaryHelper')
const Image = require('../models/imageSchema.model')
const cloudinary = require('../config/cloudinary')


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

const getImages = async(req,res) => {
    try {
        const image = await Image.find()
        res.status(200).json({
            success:true,
            images:image
        })
    } catch (error) {
         res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}

const deleteImage = async (req, res) => {
  const { id } = req.params;
  const userId = req.userInfo.userId;

  try {
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from MongoDB
    await Image.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete Image Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {uploadImage,getImages,deleteImage}