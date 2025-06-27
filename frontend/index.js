document.addEventListener('DOMContentLoaded', async () => {
    
    const apiUrl = "http://localhost:5000";

    const form = document.getElementById('createForm');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("clicked");

        const formData = new FormData(e.target);

        try {
            const res = await axios.post(`${apiUrl}/user`, formData);

            const data = res.data;
            console.log(data);
            
            if(!data?.success ){
                throw new Error(data?.message);
            }else{
                console.log("User creation successfull");
            }

        } catch (error) {
            console.error(error);
        }
    }

    form.addEventListener('submit', handleSubmit);
    
    const renderImages = async() => {
        try {
            const res = await axios.get(`${apiUrl}/user`);
            
            const data = res.data.data;
            console.log(data);

            const div = document.createElement('div');

            for (const user of data) {
                const img = document.createElement('img');
                img.src = apiUrl + user.profilePicture;
                img.style.width = "50%";

                div.appendChild(img);
            }

            document.body.appendChild(div);

        } catch (error) {
            console.error(error);
        }
    }

    await renderImages();

})