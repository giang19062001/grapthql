import { graphqlRequest } from "./request"


  

export const pushNotification = async () => {
    const query = `mutation PushNotification($content: String) {
        pushNotification(content: $content) {
          message
        }
      }
    `

    const data = await graphqlRequest({query, variables:{content: ' notification text random '}})
    return data
  }
  
  export const getNotification = `subscription PushNotification {
    notification {
      message
    }
  }`