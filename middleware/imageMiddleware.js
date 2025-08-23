const multer = require('multer')
const path = require('path')

// create storage
const Storage = multer.diskStorage({
    destination: function(req,res,cd) {
        cd(null,'Uploads/')
    },
    filename:function(req,file,cd){
        cd(null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})

// check filter
const checkFileFilter = (req,file,cd) => {
     if(file.mimetype.startsWith('image')){
        cd(null,true)
    }
    else{
        cd(new Error('Not an image! please upload only images'))
    }
}

// middleware multer

module.exports = multer({
    storage:Storage,
    fileFilter:checkFileFilter,
    limits :{
        fieldSize: 9* 1024 * 1024  // 9mb
    },
})