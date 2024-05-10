export const graphqlRequest = async (payload, options = {}) => {
   if(localStorage.getItem('accessToken')){
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        ...options
      },
      body: JSON.stringify(payload)
    })
    if(!res.ok){
      return null
    }
    
    const { data } = await res.json()
    return data
   }else{
    return null
   }
   
  }