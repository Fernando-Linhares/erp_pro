import sqlite3 from "sqlite3";

export default class Connection
{
    static __stmt;

    dbpath;

    constructor(dbpath)
    {
        this.dbpath = dbpath;
    }

    getInstance()
    {
        if(Connection.__stmt)
            return  Connection.__stmt;

        sqlite3.verbose();

        Connection.__stmt = new sqlite3.Database(this.dbpath);

        return Connection.__stmt;
    }
};