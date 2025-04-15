import { Client, Account, Databases, Client } from 'appwrite';
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
}

const service = new Service;
export default service