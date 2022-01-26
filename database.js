function insertContact(db, contact) {
	const txn = db.transaction('customer', 'readwrite');
	const store = txn.objectStore('customer');
	
	let query = store.put(contact);

	txn.oncomplete = function () {
	    db.close();
	};
}

function open_database() {
	var db;
	var request = indexedDB.open("resultsDB", "1");
	
	request.onsuccess = function(event) {
		db = event.target.result;
		
		var iter = new FormData(document.querySelector('form')).entries();
		
		insertContact(db, {
			"fname": iter.next().value[1],
			"lname": iter.next().value[1],
			"dob": iter.next().value[1],
			"cob": iter.next().value[1],
			"dln": iter.next().value[1],
			"dld": iter.next().value[1],
			"dlp": iter.next().value[1]
		});
	};
	
	request.onerror = function(event) {
		console.log("an error requesting the database has occurred");
	};
	
	request.onupgradeneeded = function(event) {
	  	db = event.target.result;

		var objectStore = db.createObjectStore("customer", { keyPath: "id", autoIncrement: true });
		
		objectStore.createIndex("fname", "fname", { unique:false });
		objectStore.createIndex("lname", "lname", { unique:false });
		objectStore.createIndex("dob", "dob", { unique:false });
		objectStore.createIndex("cob", "cob", { unique:false });
		objectStore.createIndex("dln", "dln", { unique:false });
		objectStore.createIndex("dld", "dld", { unique:false });
		objectStore.createIndex("dlp", "dlp", { unique:false });
	};
}

function apply_to_all_customers(func) {
	var db;
	var request = indexedDB.open("resultsDB");
	
	request.onsuccess = function(event) {
		db = event.target.result;
		
		const txn = db.transaction('customer', "readonly");
		const objectStore = txn.objectStore('customer');

		objectStore.openCursor().onsuccess = (event) => {
			let cursor = event.target.result;
			
			if (cursor) {
				let contact = cursor.value;
				
				func(contact.fname + " " + contact.lname, 
					contact.dob,
					contact.cob && contact.dln && contact.dld && contact.dlp);
				
				cursor.continue();
			}
		};
			
		txn.oncomplete = function () {
			db.close();
		};
	};
}
