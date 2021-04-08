import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { playListData } from 'src/app/models/playListData';
import { FriendListService } from 'src/app/Services/dashBoardService/friendListService/friend-list.service';
import { ImportPlayListsService } from 'src/app/Services/dashBoardService/importPlayListService/import-play-lists.service';
import { PendingRequestsService } from 'src/app/Services/dashBoardService/pendingRequestsService/pending-requests.service';
import { PlayListsService } from 'src/app/Services/dashBoardService/playListsService/play-lists.service';
import { UserRegardingService } from 'src/app/Services/user-regarding.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private friendListService: FriendListService,
		private pendingRequestsService: PendingRequestsService,
		private playListsService: PlayListsService,
		private importplayList: ImportPlayListsService,
		private userRegarding: UserRegardingService,
		private sanitizer: DomSanitizer,
		private router: Router) { }

	friendListData: any = [];
	pendingRequestsData: any = [];
	playListsData: any = [];
	songsData: any = [];
	userDetailsData: any = {};
	// variables for serching friend

	searchedUserName: any = "";
	searchedUserData: any = {};
	userSerched: boolean = false;
	friends : boolean = false;

	// till here



	ngOnInit(): void {
		this.playListsService.getPlayLists().subscribe((data): any => {
			this.playListsData = data.data.playLists
			console.log(this.playListsData)
			this.songsData = this.playListsData[0].songs;

		});

		this.friendListService.getFriendList().subscribe((data): any => {
			this.friendListData = data.data.friendList;
			console.log(this.friendListData);
		});

		this.pendingRequestsService.getPendingrequests().subscribe((data): any => {
			this.pendingRequestsData = data.data.friendRequests;
			console.log(this.pendingRequestsData);
		});

		this.userRegarding.getUserDetails().subscribe((data: any) => {
			this.userDetailsData = data.data;
		});
	}

	playList: any = {
		playListName: "",
		song: {}
	}

	onFileChange(event: any) {
		// this.makePlayList(event).then((data: any) => {
		// 	console.log(data);
		// 	this.importplayList.importPlayList(data).subscribe((data: any) => {
		// 		if (data.success) {
		// Swal.fire("SongShareApp", data.message, "success");
		// 		}
		// 		else {
		// 			Swal.fire("SongShareApp", data.message, "error");
		// 		}
		// 	});
		// });

		let files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			this.putFilesInWay(files[i]).then((data: any) => {
				this.playList.song = Object.assign({}, data);
				this.postSong(this.playList).then((data: any) => {
					if ((i == files.length - 1) && (data.success)) {
						Swal.fire("SongShareApp", data.message, "success");
					}
				})
			})
		}
	}

	postSong(song: any) {
		return new Promise(resolve => {
			this.importplayList.importPlayList(song).subscribe((data: any) => {
				resolve(data);
			})
		})
	}

	getPLayListName() {
		this.playList.playListName = String(prompt("Enter Name Of PlayList"));
	}

	makePlayList(event: any) {
		return new Promise(resolve => {
			this.playList.playListName = "";
			this.playList.songs = [];
			let files = event.target.files;
			console.log(files);
			for (let i = 0; i < files.length; i++) {
				this.putFilesInWay(files[i]).then((data: any) => {
					console.log(data);
					let song = Object.assign({}, data);
					this.playList.songs.push(song);
					if (i === files.length - 1) {
						this.playList.playListName = String(prompt("Enter Name Of PlayList"));
						resolve(this.playList);
					}
				});
			}
			// console.log(this.playList);
			// resolve(this.playList);
		});
	}

	putFilesInWay(file: any) {
		return new Promise(resolve => {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e: any) => {
				resolve({ songName: file.name, song: e.target.result });
			}
		})
	}

	urlSanitizer(url: any) {
		return this.sanitizer.bypassSecurityTrustUrl(url);
	}

	getSongsOfPlaylist(playListName: any) {
		this.playListsData.forEach((element: any) => {
			if (element.playListName === playListName) {
				this.songsData = element.songs;
			}
		});
	}

	getSearchedFriend() {
		this.friends = false;
		this.userRegarding.getSearchedFriend({ userName: this.searchedUserName }).subscribe((data: any) => {
			if (data.success) {
				this.searchedUserData = data.data;
				this.userSerched = true;
				this.friends = data.data.friends;
			}
			else {
				this.userSerched = false;
				this.searchedUserData = data
			}
		})
	}

	changeUserImage(event: any) {
		console.log(event);
		let file = event.target.files[0];
		console.log(file);
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e: any) => {
			this.userRegarding.changeUserImage({ image: e.target.result }).subscribe((data: any) => {
				if (data.success) {
					Swal.fire("SongShareApp", data.message, "success");
				}
				else {
					Swal.fire("SongShareApp", data.message, "warning");
				}
			});
		}
	}

	sendFriendRequest(user : any) {
		this.userRegarding.sendFriendRequest(user).subscribe((data : any) => {
			if(data.success) {
				Swal.fire("SongShareApp", data.message, "success");
			}
		})
	}

	addToFriend(friend : any) {
		this.userRegarding.acceptRequest(friend).subscribe((data : any) => {
			if(data.success) {
				Swal.fire("SongShareApp", data.message, "success");
			}
		})
	}

	removeRequest(friend : any) {
		this.userRegarding.declinerequest(friend.userName).subscribe((data : any) => {
			if(data.success) {
				Swal.fire("SongShareApp", data.message, "success");
			}
		})
	}
}
