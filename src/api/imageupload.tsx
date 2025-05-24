

export async function uploadImage(file : string) : Promise<string> {
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET;
    const url = process.env.NEXT_PUBLIC_NEXT_PUBLIC_CLOUDINARY_URL;

    if(!preset || !url){
        throw new Error('unable to bring in Cloudinary env data');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    const res = await fetch(url,{
        method : "POST",
        body : formData
    })

    if((!res.ok)){
        throw new Error('failed to upload the image');
    }

    const data = await res.json() as {url : string}
    console.log(data);
    console.log(data.url)
    return data.url
}
