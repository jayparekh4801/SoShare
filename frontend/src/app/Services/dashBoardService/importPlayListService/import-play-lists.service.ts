import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ImportPlayListsService {

	constructor(private http: HttpClient) { }

	importPlayList(playList: any): Observable<any> {
		// let s = playList.songs;
		// console.log(s);
		// let playListJson = {
		// 	playList: Object.assign({}, playList)
		// }
		// console.log(playListJson);
		// console.log(playList.songs);
		// console.log(playListJson.playList.songs);
		let header = new HttpHeaders();
		let userName = localStorage.getItem("userName");
		if (userName != null) {
			header = header.set("userName", userName);
		}
		console.log(playList);
		return this.http.post("http://localhost:8000/importPlayList", playList, { headers: header });
	}
}
