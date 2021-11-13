class Profile{
    constructor(){
        this.clientid='',
        this.clientSecret=''
    }

    async getProfile(username){
        ///profile
        const profileResponse= await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
        const profile = await profileResponse.json();
        //profile -> id
        const todoResponse=await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`);
        const todo=await todoResponse.json();
        return{
            profile,
            todo
        }
    }
}

//////////////////////// API deki bilgileri çekme