var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, } from 'angularfire2/firestore';
import { first, map, take, tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
var FirestoreProvider = /** @class */ (function () {
    function FirestoreProvider(afs, afAuth) {
        this.afs = afs;
        this.afAuth = afAuth;
    }
    Object.defineProperty(FirestoreProvider.prototype, "timestamp", {
        /// **************
        /// Get a Reference
        /// **************
        /// Firebase Server Timestamp
        get: function () {
            return firebase.firestore.FieldValue.serverTimestamp();
        },
        enumerable: true,
        configurable: true
    });
    FirestoreProvider.prototype.col = function (ref, queryFn) {
        return typeof ref === 'string' ? this.afs.collection(ref, queryFn) : ref;
    };
    /// **************
    /// Get Data
    /// **************
    FirestoreProvider.prototype.doc = function (ref) {
        return typeof ref === 'string' ? this.afs.doc(ref) : ref;
    };
    // Observables
    FirestoreProvider.prototype.doc$ = function (ref) {
        return this.doc(ref).snapshotChanges().pipe(map(function (doc) {
            return doc.payload.data();
        }));
    };
    FirestoreProvider.prototype.col$ = function (ref, queryFn) {
        return this.col(ref, queryFn).snapshotChanges().pipe(map(function (docs) {
            return docs.map(function (a) { return a.payload.doc.data(); });
        }));
    };
    /// with Ids
    FirestoreProvider.prototype.colWithIds$ = function (ref, queryFn) {
        return this.col(ref, queryFn).stateChanges().pipe(map(function (actions) { return actions.map(function (a) {
            var id = a.payload.doc.id;
            var data = a.payload.doc.data();
            return __assign({ id: id }, data);
        }); }));
    };
    // Promise
    FirestoreProvider.prototype.getDoc = function (ref) {
        return this.doc$("" + ref).pipe(first()).toPromise();
    };
    FirestoreProvider.prototype.getCol = function (ref) {
        return this.col$("" + ref).pipe(first()).toPromise();
    };
    /// **************
    /// Write Data
    /// **************
    FirestoreProvider.prototype.getId = function () {
        return this.afs.createId();
    };
    FirestoreProvider.prototype.get = function (ref, val) {
        return this.afs.doc(ref).ref.get().then(function (doc) {
            return doc.get(val);
        });
    };
    FirestoreProvider.prototype.set = function (ref, data) {
        var timestamp = this.timestamp;
        return this.doc(ref).set(__assign({}, data, { updatedAt: timestamp, createdAt: timestamp }));
    };
    FirestoreProvider.prototype.update = function (ref, data) {
        return this.doc(ref).update(__assign({}, data, { updatedAt: this.timestamp }));
    };
    /// If doc exists update, otherwise set
    FirestoreProvider.prototype.upsert = function (ref, data) {
        var _this = this;
        console.log(ref, data);
        var doc = this.doc(ref).snapshotChanges().pipe(take(1)).toPromise();
        return doc.then(function (snap) {
            return snap.payload.exists ? _this.update(ref, data) : _this.set(ref, data);
        });
    };
    FirestoreProvider.prototype.delete = function (ref) {
        return this.doc(ref).delete();
    };
    FirestoreProvider.prototype.add = function (ref, data) {
        var timestamp = this.timestamp;
        return this.col(ref).add(__assign({}, data, { updatedAt: timestamp, createdAt: timestamp }));
    };
    FirestoreProvider.prototype.geopoint = function (lat, lng) {
        return new firebase.firestore.GeoPoint(lat, lng);
    };
    // Clumsy, remove?
    FirestoreProvider.prototype.change = function (ref, data, type) {
        var _a;
        console.log(data, type);
        return this.doc(ref).update(__assign({}, data, (_a = {}, _a[type] = this.timestamp, _a)));
    };
    /// **************
    /// Inspect Data
    /// **************
    FirestoreProvider.prototype.inspectDoc = function (ref) {
        var tick = new Date().getTime();
        this.doc(ref).snapshotChanges().pipe(take(1), tap(function (d) {
            var tock = new Date().getTime() - tick;
            console.log("Loaded Document in " + tock + "ms", d);
        }))
            .subscribe();
    };
    FirestoreProvider.prototype.inspectCol = function (ref) {
        var tick = new Date().getTime();
        this.col(ref).snapshotChanges().pipe(take(1), tap(function (c) {
            var tock = new Date().getTime() - tick;
            console.log("Loaded Collection in " + tock + "ms", c);
        }))
            .subscribe();
    };
    /// **************
    /// Create and read doc references
    /// **************
    /// create a reference between two documents
    FirestoreProvider.prototype.connect = function (host, key, doc) {
        var _a;
        return this.doc(host).update((_a = {}, _a[key] = this.doc(doc).ref, _a));
    };
    /// returns a documents references mapped to AngularFirestoreDocument
    FirestoreProvider.prototype.docWithRefs$ = function (ref) {
        var _this = this;
        return this.doc$(ref).pipe(map(function (doc) {
            for (var _i = 0, _a = Object.keys(doc); _i < _a.length; _i++) {
                var k = _a[_i];
                if (doc[k] instanceof firebase.firestore.DocumentReference) {
                    doc[k] = _this.doc(doc[k].path);
                }
            }
            return doc;
        }));
    };
    /// **************
    /// Atomic batch example
    /// **************
    /// Just an example, you will need to customize this method.
    FirestoreProvider.prototype.atomic = function () {
        var batch = firebase.firestore().batch();
        /// add your operations here
        var itemDoc = firebase.firestore().doc('items/myCoolItem');
        var userDoc = firebase.firestore().doc('users/userId');
        var currentTime = this.timestamp;
        batch.update(itemDoc, { timestamp: currentTime });
        batch.update(userDoc, { timestamp: currentTime });
        /// commit operations
        return batch.commit();
    };
    // Convert number inputs to numbers by default
    FirestoreProvider.prototype.convertToNumber = function (event) {
        return +event;
    };
    FirestoreProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFirestore, AngularFireAuth])
    ], FirestoreProvider);
    return FirestoreProvider;
}());
export { FirestoreProvider };
//# sourceMappingURL=firestore.js.map