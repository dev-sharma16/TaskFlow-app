import { Client, Databases, ID, Query} from 'appwrite';
import conf from '../conf/conf'

export class Service{

  client = new Client();
  databases;
  
  constructor(){
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
  }

  // creating a task
  async createTask(data){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        data
      )
    } catch (error) {
      console.error("Appwrite createTask error:", error);
    }
  }

  // updating existing task 
  async updateTask(taskId, data){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        taskId,
        data
      )
    } catch (error) {
      console.error("Appwrite updateTask error:", error);
    }

  }

  // deleting Task
  async deleteTask(taskId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        taskId
      );
      return true;
    } catch (error) {
      console.error("Appwrite deleteTask error:", error);
      throw error;
    }
  }

  // get a single task
  async getTaskById(taskId){
    return await this.databases.getDocument(
       conf.appwriteDatabaseId,
       conf.appwriteCollectionId,
       taskId
    )
  }

  // list all task by userID
  async getTaskByUser(userId){
    return await this.databases.listDocuments(
       conf.appwriteDatabaseId,
       conf.appwriteCollectionId,
       [Query.equal("userId", userId)]
    )
  }

}

const service = new Service;
export default service