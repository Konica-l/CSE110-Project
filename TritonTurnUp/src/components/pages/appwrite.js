import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67343ac7002fe46b6f77');

const account = new Account(client);

export {account, client};