const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const cldUpload = async (folder, name, tempFilePath ) => {
    const { public_id, version } = await cloudinary.uploader.upload(tempFilePath, {
        folder, 
        public_id: name
    })
    const split_public_id = public_id.split('/')
    const uploadedName = split_public_id[split_public_id.length - 1]
    return { /* retorna name y folder */
        version, uploadedName
    }
}

const cldDestroy = async (folder, name) => { /* Elimina imagen */
    const del = await cloudinary.uploader.destroy(folder+'/'+name)
    return {
        del
    }
}

module.exports = {
    cldUpload,
    cldDestroy
}