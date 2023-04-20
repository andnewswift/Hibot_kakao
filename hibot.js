const Bot = BotManager.getCurrentBot();
const scriptName = "Hibot";//BotName(반드시 바꿔주세요!)
const Context = android.content.Context;
const SQLiteDatabase = android.database.sqlite.SQLiteDatabase;
const DatabaseUtils = android.database.DatabaseUtils;
const PowerManager = android.os.PowerManager;
const Base64 = android.util.Base64;
const ProcessBuilder = java.lang.ProcessBuilder;
const Process = java.lang.Process;
const InputStreamReader = java.io.InputStreamReader;
const OutputStreamReader = java.io.OutputStreamReader;
const BufferedReader = java.io.BufferedReader;
const ArrayList = java.util.ArrayList;
const _Array = java.lang.reflect.Array;
const _Byte = java.lang.Byte;
const _Integer = java.lang.Integer;
const Runtime = java.lang.Runtime;
const _String = java.lang.String;
const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;
const Cipher = javax.crypto.Cipher;
const File = java.io.File;
const IvParameterSpec = javax.crypto.spec.IvParameterSpec;
const JSONObject = org.json.JSONObject;
const System = java.lang.System;
const PBEKeySpec = javax.crypto.spec.PBEKeySpec;
const SecretKeyFactory = javax.crypto.SecretKeyFactory;
const SecretKeySpec = javax.crypto.spec.SecretKeySpec;
const KTPackage = "com.kakao.talb";//DB를 읽을 카카오톡 패키지 명
const MY_KEY = "337865251";
const Loading_cycle = 1000;//불러오는 주기 ms단위(1초 == 1000ms)
const SdcardPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var powerManager = App.getContext().getSystemService(Context.POWER_SERVICE);
var wakelock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, scriptName);
wakelock.acquire();//wakelock걸기!

let db = null;
let db2 = null;
let Cursor = {
	"FIELD_TYPE_BLOB": 4,
	"FIELD_TYPE_STRING": 3,
	"FIELD_TYPE_FLOAT": 2,
	"FIELD_TYPE_INTEGER": 1,
	"FIELD_TYPE_NULL": 0
};
/**
 * @author Hibot
 * @license GPL3.0
 * @see https://github.com/hui1601/libdream
 */
const dream_arr1 = ["adrp.ldrsh.ldnp", "ldpsw", "umax", "stnp.rsubhn", "sqdmlsl", "uqrshl.csel", "sqshlu", "umin.usubl.umlsl", "cbnz.adds", "tbnz", "usubl2", "stxr", "sbfx", "strh", "stxrb.adcs", "stxrh", "ands.urhadd", "subs", "sbcs", "fnmadd.ldxrb.saddl", "stur", "ldrsb", "strb", "prfm", "ubfiz", "ldrsw.madd.msub.sturb.ldursb", "ldrb", "b.eq", "ldur.sbfiz", "extr", "fmadd", "uqadd", "sshr.uzp1.sttrb", "umlsl2", "rsubhn2.ldrh.uqsub", "uqshl", "uabd", "ursra", "usubw", "uaddl2", "b.gt", "b.lt", "sqshl", "bics", "smin.ubfx", "smlsl2", "uabdl2", "zip2.ssubw2", "ccmp", "sqdmlal", "b.al", "smax.ldurh.uhsub", "fcvtxn2", "b.pl"],
dream_arr2 = ["saddl", "urhadd", "ubfiz.sqdmlsl.tbnz.stnp", "smin", "strh", "ccmp", "usubl", "umlsl", "uzp1", "sbfx", "b.eq", "zip2.prfm.strb", "msub", "b.pl", "csel", "stxrh.ldxrb", "uqrshl.ldrh", "cbnz", "ursra", "sshr.ubfx.ldur.ldnp", "fcvtxn2", "usubl2", "uaddl2", "b.al", "ssubw2", "umax", "b.lt", "adrp.sturb", "extr", "uqshl", "smax", "uqsub.sqshlu", "ands", "madd", "umin", "b.gt", "uabdl2", "ldrsb.ldpsw.rsubhn", "uqadd", "sttrb", "stxr", "adds", "rsubhn2.umlsl2", "sbcs.fmadd", "usubw", "sqshl", "stur.ldrsh.smlsl2", "ldrsw", "fnmadd", "stxrb.sbfiz", "adcs", "bics.ldrb", "ldursb", "subs.uhsub", "ldurh", "uabd", "sqdmlal"];

function dream(param){
    return dream_arr1[param % 54] + "." + dream_arr2[(param + 31) % 57];
}
/* END */

function toByteArray(bytes) {
	let res = _Array.newInstance(_Byte.TYPE, bytes.length);
	for (var i = 0; i < bytes.length; i ++) {
		res[i] = new _Integer(bytes[i]).byteValue();
	}
	return res;
}
function toCharArray(chars) {
	return new _String(chars.map((e) => String.fromCharCode(e)).join("")).toCharArray();
}

function decrypt(userId, enc, text) {
	if(text == null) return null;
	try {
		let iv = toByteArray([15, 8, 1, 0, 25, 71, 37, -36, 21, -11, 23, -32, -31, 21, 12, 53]);
		let password = toCharArray([22, 8, 9, 111, 2, 23, 43, 8, 33, 33, 10, 16, 3, 3, 7, 6]);
		let prefixes = ["", "", "12", "24", "18", "30", "36", "12", "48", "7", "35", "40", "17", "23", "29", "isabel", "kale", "sulli", "van", "merry", "kyle", "james", "maddux", "tony", "hayden", "paul", "elijah", "dorothy", "sally", "bran", dream(0xcad63)];
		let salt = new _String((prefixes[enc] + userId).slice(0, 16).padEnd(16, "\0")).getBytes("UTF-8");
		let secretKeySpec = new SecretKeySpec(SecretKeyFactory.getInstance("PBEWITHSHAAND256BITAES-CBC-BC").generateSecret(new PBEKeySpec(password, salt, 2, 256)).getEncoded(), "AES");
		let ivParameterSpec = new IvParameterSpec(iv);
		let cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(2, secretKeySpec, ivParameterSpec);
		return String(new _String(cipher.doFinal(Base64.decode(text, 0)), "UTF-8"));
	} catch (e) {
		Log.error(e.lineNumber + ": " + e);
		return null;
	}
}
function isDirectoryExists(path){
	let f = new File(path);
	return f.exists() && f.isDirectory()
}
function copyDB() {
	try {
		if(!isDirectoryExists(SdcardPath + "/KakaoTalkDB")){
			let f = new File(SdcardPath + "/KakaoTalkDB");
			f.mkdir();
		}
		var cmd = new ArrayList();
		cmd.add("su");
		cmd.add("-c");
		cmd.add("cp -R /data/data/" + KTPackage + "/databases/* " + SdcardPath + "/KakaoTalkDB/")
		var ps = new ProcessBuilder(cmd);
		ps.redirectErrorStream(true);
		var pr = ps.start();
		pr.waitFor();
		return true;
	} catch (e) {
		Log.error(e.lineNumber + ": " + e);
		return false;
	}
}
function connectDB() {
	copyDB();
	try {
		var kakao1 = SdcardPath + "/KakaoTalkDB/KakaoTalk.db", kakao2 = SdcardPath + "/KakaoTalkDB/KakaoTalk2.db";
		if(db != null) db.close();
		if(db2 != null) db2.close();
		db = SQLiteDatabase.openDatabase(kakao1, null, SQLiteDatabase.ENABLE_WRITE_AHEAD_LOGGING);
		db2 = SQLiteDatabase.openDatabase(kakao2, null, SQLiteDatabase.ENABLE_WRITE_AHEAD_LOGGING);
		return true;
	} catch (e) {
		Log.error(e.lineNumber + ": " + e);
		return false;
	}
}
function sqlQuery(con, query, selectionArgs){
	if(typeof selectionArgs !== "object") selectionArgs = [];
	let cursor = con.rawQuery(query, selectionArgs);
	let columns = cursor.getColumnNames();
	let result = [];
	if(!cursor.moveToFirst()){
		cursor.close();
		return [];
	}
	do {
		let obj = new JSONObject("{}");
		for (let i = 0; i < columns.length; i ++) {
			obj.put(columns[i], cursor.getString(i));
		}
		result.push(obj);
	}while (cursor.moveToNext());
	cursor.close();
	return result;
}
function getRecentChatData(count) {
	try {
		let result = sqlQuery(db, "SELECT * FROM chat_logs ORDER BY created_at DESC LIMIT ?", [count]);
		let decryptColumn = ["attachment", "message"], jsonParseColumn = ["attachment"];
		result.forEach(function (obj){
			obj.put("v", new JSONObject(obj.get("v")));
			decryptColumn.forEach(function (dec){
				try{
					if(obj.get(dec) == null || obj.get(dec) == "{}") return;
					obj.put(dec, decrypt(obj.get("user_id"), obj.get("v").get("enc"), obj.get(dec)));
				} catch(e){
					Log.e("없는 Column: " + dec);
					obj.put(dec, "{}");
				}
			});
			jsonParseColumn.forEach(function (parse){
				try{
					if(obj.get(parse) !== null && obj.get(parse) != ""){
						obj.put(parse, new JSONObject(obj.get(parse)));
					}
					else {
						obj.put(parse, new JSONObject("{}"));
					}
				} catch(e){
					Log.e("없는 Column: " + parse);
				}
			});
		});
		return result;
	} catch (e) {
		Log.error(e.lineNumber + ": " + e);
		return [];
	}
}
function getRoomName(chat_id) {
	try {
		let room = "";
		let cursor = db.rawQuery("SELECT link_id FROM chat_rooms WHERE id=" + chat_id, null);
		cursor.moveToNext();
		let link_id = cursor.getString(0);
		if (link_id != null) {
			let cursor2 = db2.rawQuery("SELECT name FROM open_link WHERE id=?", [link_id]);
			cursor2.moveToNext();
			room = cursor2.getString(0);
			cursor2.close();
			cursor.close();
		} else {
			let a = JSON.parse(cursor.getString(16));
			cursor.close();
			return a[a.length - 1].content;
		}
		return room;
	} catch (e) {
		Log.error(e.lineNumber + ": " + e);
		return null;
	}
}

function getUserInfo(user_id, info) {
	try {
		let data = sqlQuery(db2, "SELECT * FROM friends WHERE id=?", [user_id]);
		let decryptColumn = ["name", "profile_image_url", "full_profile_image_url", "original_profile_image_url", "status_message", "v", "contact_name"];
		let obj = data[0].get(info);
		if(decryptColumn.includes(info)) {
			return decrypt(MY_KEY, data[0].get("enc"), obj);
		}
		return obj;
	} catch (e) {
		Log.error(e.lineNumber + ": " + e);
		return null;
	}
}
function DatabaseWatcher() {
	this.looper = null;
	this.pre = null;
}
DatabaseWatcher.prototype = {
	start: function () {
		if (this.looper !== null) return false;
		Log.debug("looper is null");
		this.looper = setInterval(function () {
			if(!Bot.getPower()) {///봇이 안꺼지는 문제 해결
				watcher.stop();
				return;
			}
			if (!connectDB()) {
				return;
			}
			let count = DatabaseUtils.queryNumEntries(db, "chat_logs", null);
			if (this.pre == null) {
				Log.d("first execute");
				this.pre = count;
				return;
			}
			let change = count - this.pre;
			this.pre = count;
			if(change <= 0) {// if nothing chaged, stop it
				return;
			}

			let stack = getRecentChatData(change), obj;
			while (obj = stack.pop()) {
				let room = getRoomName(obj.get("chat_id"));
				let send_username = getUserInfo(obj.get("user_id"), "name");
				Log.d(room + "방의 " + send_username + ": " +obj.get("message") + "\n" + obj.get("attachment").toString(4));
				if(send_username == null) send_username = "";
				else if(!(obj.get("v").get("origin") == "DELMEM" && new JSONObject(obj.get("message")).get("feedType") == 2) && (obj.get("v").get("origin") == "KICKMEM" || obj.get("v").get("origin") == "DELMEM")) send_username = send_username + "님이 ";
				else send_username = send_username + "님 ";
				switch(Number(obj.get("type"))){
					case 0:
						if (obj.get("v").get("origin") == "NEWMEM")
							Bot.send(room, send_username + "안녕하세요! 공지에 있는 규칙 필독해주세요.", KTPackage);
						else if (obj.get("v").get("origin") == "DELMEM" && new JSONObject(obj.get("message")).get("feedType") == 2)
							Bot.send(room, send_username + "안녕히가세요!", KTPackage);
						else if (obj.get("v").get("origin") == "KICKMEM" || obj.get("v").get("origin") == "DELMEM"){
							obj.put(message, new JSONObject(obj.get("message")));
							let by = getUserInfo(obj.get("message").get("member").getString("userId"), "name");
							if(by == null) by = "";
							else by = by + "님을 ";
							if(by == "" && send_username == "") Bot.send(room, "다음부턴 착하게 사세요!", KTPackage);
							else Bot.send(room, send_username + by + "강퇴하였습니다. 다음부턴 착하게 사세요!", KTPackage);
						}
						if (connectDB()) {
							let count = DatabaseUtils.queryNumEntries(db, "chat_logs", null);
							if (this.pre == null) {
								Log.d("first execute");
								this.pre = count;
							} else {
								let change = count - this.pre;
								this.pre = count;
								if (change > 0) {//if something changed
									let stack = getRecentChatData(change);
									while (stack.length > 0) {
										let obj = stack.pop();
										obj.message = decrypt(obj.user_id, obj.v.enc, "" + obj.message);
										let room = getRoomName(obj.chat_id);
										let send_username = getUserInfo(obj.user_id, "name");
										if(send_username == null) send_username = "";
										else if(!(obj.v.origin == "DELMEM" && JSONObject(obj.message).get("feedType") == 2) && (obj.v.origin == "KICKMEM" || obj.v.origin == "DELMEM")) send_username = send_username + "님이 ";
										else send_username = send_username + "님 ";
										if (obj.v.origin == "NEWMEM")
											Bot.send(room, send_username + "안녕하세요! 공지에 있는 규칙 필독해주세요.", KTPackage);
										else if (obj.v.origin == "DELMEM" && JSONObject(obj.message).get("feedType") == 2)
											Bot.send(room, send_username + "안녕히가세요!", KTPackage);
										else if (obj.v.origin == "KICKMEM" || obj.v.origin == "DELMEM"){
											obj.message = new JSONObject(obj.message);
											let by = getUserInfo(obj.message.get("member").getString("userId"), "name");
											if(by == null) by = "";
											else by = by + "님을 ";
											if(by == "" && send_username == "") Bot.send(room, "다음부턴 착하게 사세요!", KTPackage);
											else Bot.send(room, send_username + by + "강퇴하였습니다. 다음부턴 착하게 사세요!", KTPackage);
										}
										else if (obj.type == 26 && obj.message == "who") {
											obj.attachment = new JSONObject(decrypt(obj.user_id, obj.v.enc, "" + obj.attachment));
											let userid = obj.attachment.getString("src_userId");
											Bot.send(room, "이름: "+getUserInfo(userid, "name")
											+"\n프로필 사진: "+getUserInfo(userid, "original_profile_image_url")
											+"\n상태 메시지: "+getUserInfo(userid, "status_message"), KTPackage);
										}
										else if (obj.type == 26 && obj.message == "photolink") {
											obj.attachment = new JSONObject(decrypt(obj.user_id, obj.v.enc, "" + obj.attachment));
											if(obj.attachment.get("src_type") != 2) {
												Bot.send(room, "사진이 아닙니다!", KTPackage);
												return;
											}
											let chat_id = new _String(obj.attachment.get("src_logId"));
											let cursor = db.rawQuery("SELECT * FROM chat_logs WHERE id=" + chat_id, null);
											cursor.moveToNext();
											let userId1=cursor.getString(4), msg1=cursor.getString(6);
											cursor.close();
											let photo = decrypt(userId1, getUserInfo(userId1, "enc"), "" + msg1);
											photo = new JSONObject(photo);
											Bot.send(room, "링크: " + photo.get("url"), KTPackage);
										}
										else if (obj.type == 26 && obj.message == "msgraw"){
											obj.attachment = new JSONObject(decrypt(obj.user_id, obj.v.enc, "" + obj.attachment));
											let chat_id = new _String(obj.attachment.get("src_logId"));
											let cursor = db.rawQuery("SELECT * FROM chat_logs WHERE id=" + chat_id, null);
											cursor.moveToNext();
											let userId1 = cursor.getString(4), msg1 = cursor.getString(5), attachment1 = cursor.getString(6), type = cursor.getString(2);
											cursor.close();
											Bot.send(room, "msg type: " + type + "\nmsg: " + decrypt(userId1, getUserInfo(userId1, "enc"), "" + msg1) + "\nattachment: " + decrypt(userId1, getUserInfo(userId1, "enc"), "" + attachment1), KTPackage);
										}
									}
								}
								userId1 = src_message.get("user_id");
								msg1 = src_message.get("message");
								photo = decrypt(userId1, getUserInfo(userId1, "enc"), "" + msg1);
								photo = new JSONObject(photo);
								Bot.send(room, "링크: " + photo.get("url"), KTPackage);
								break;
							case "msgraw":
								userId1 = src_message.get("user_id");
								msg1 = src_message.get("message");
								attachment1 = src_message.get("attachment");
								type = src_message.get("type");
								Bot.send(room, "msg type: " + type
									+ "\nmsg: " + decrypt(userId1, getUserInfo(userId1, "enc"), "" + msg1)
									+ "\nattachment: " + decrypt(userId1, getUserInfo(userId1, "enc"), "" + attachment1), KTPackage);
								break;
						}
						break;
				}
			}
		}, Loading_cycle);
		return true;
	},
	stop: function () {
		if (this.looper == null) return false;
		try{
			wakelock.release();//wake lock 풀어버리깃!
		}catch(e){}
		clearInterval(this.looper);
		this.looper = null;
		return true;
	}
};
let watcher = new DatabaseWatcher();
watcher.start();

function onStartCompile() {
	Log.d("Complie!!");
	watcher.stop();
}
Bot.addListener(Event.START_COMPILE, onStartCompile);
