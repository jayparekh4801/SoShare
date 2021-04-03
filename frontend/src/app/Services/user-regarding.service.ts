import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserRegardingService {

	constructor(private http: HttpClient) { }

	getSearchedFriend(searchedUserName: any) {
		let header = new HttpHeaders();
		let userName = localStorage.getItem("userName");
		if (userName != null) {
			header = header.set('userName', userName);
		}
		return this.http.post("http://localhost:8000/searchFriend", searchedUserName, {headers : header});
	}

	changeUserImage(image : any) {
		let header = new HttpHeaders();
		let userName = localStorage.getItem("userName");
		if (userName != null) {
			header = header.set('userName', userName);
		}
		return this.http.post("http://localhost:8000/changeImage", image, {headers : header})
	}

	getUserDetails() {
		let header = new HttpHeaders();
		let userName = localStorage.getItem("userName");
		if (userName != null) {
			header = header.set('userName', userName);
		}
		return this.http.get("http://localhost:8000/getUserDetails", {headers : header});
	}

	sendFriendRequest(requestedFriend : any) {
		let header = new HttpHeaders();
		let userName = localStorage.getItem("userName");
		if (userName != null) {
			header = header.set('userName', userName);
		}
		return this.http.post("http://localhost:8000/friendRequest", requestedFriend, {headers : header});
	}
}
