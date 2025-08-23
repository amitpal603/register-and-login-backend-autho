

const adminAuthorization = (req,res,next) => {
    const {role} = req.userInfo
    if(role !== 'admin'){
        res.status(400).json({
            success:false,
            message:'Access denied Admin rights require'
        })
    }
    next()
}

module.exports = adminAuthorization