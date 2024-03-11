import Connection from './src/connection.js';
import path from 'node:path';

try {
    const tables = [
        'products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, prices DECIMAL(8,2) NOT NULL, category_id INTEGER NOT NULL, created_at DATETIME DEFAULT (datetime(\'now\')), updated_at DATETIME DEFAULT (datetime(\'now\')))',
        'categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT (datetime(\'now\')), updated_at DATETIME DEFAULT (datetime(\'now\')))',
    ];

    const dirname = process.cwd();
    const conn = new Connection(path.join(dirname, 'db/database.db'));
    const stmt = conn.getInstance();

    console.log('Magrating tables');
    let i =1;
    for(let table of tables){
        console.log('migrating table '+i+'...');
        stmt.run('CREATE TABLE IF NOT EXISTS ' + table)
        console.log('table '+i+' migrated');
        i++;
    }

    console.log('Database migrated successfully!');
    stmt.close();
} catch (error) {
    console.error('error on migrate database');
    console.error(error);
}






