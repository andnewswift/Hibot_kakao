# Hibot_kakao
입퇴장 등등을 알려주는 봇 입니다<br>
원본 소스는[여기](https://cafe.naver.com/nameyee/14642)를 참고해주세요
## 자주하는 질문
1. 컴파일이 안돼여ㅠㅠㅠ<br>
-> 코드 제대로 복붙했는지 확인해주세요<br>
2.히익 No such file...으로 시작하는 에러로그가 넘쳐나요!<br>
2-1.msgbot.sh파일도 /bin폴더에 정상적으로 있어요!<br>
->https://play.google.com/store/apps/details?id=jackpal.androidterm&hl=ko에서 msgbot.sh라고 쳐보세요<br>
2-1-1."/system/bin/sh : msgbot.sh : not found"라고 떠요!<br>
->/bin/msgbot.sh를 /system/bin폴더로 옮겨보세요<br>
2-1-2."/system/bin/sh : msgbot.sh : can't execute: Permission denied"라는데요?<br>
->권한 설정 하셔야죠...<br>
2-2.msgbot.sh파일이 뭐죠?어떻게 만들죠?<br>
->Android 업데이트로 인해 카톡db로 직접적인 접근이 거부되어서 root 권한으로 내부저장소에 복사해주는 파일입니다. 이 글 마지막부분에 있어요<br>
3.루팅해야해요?<br>
->네 https://namkisec.tistory.com/entry/Magisk%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EB%A3%A8%ED%8C%85tutorial 이거보고 하시면 됩니다.<br>
4.봇을 껐는데 봇이 작동합니다?!?!(심지어 봇을 삭제해도)<br>
-&gtwatcher.stop();을 호출하면 종료돼요.봇의 액티비티 화면으로 들어가셔도 종료됩니다 :)<br>
5.응답을 안하거나 응답이 느려요ㅠㅜ<br>
->카톡 저장 메모리가 꽉차면 DB 업데이트를 해요. 한번 활동이 왕성한 아무 오픈쳇팅방에 들어가봐요<br>
6. "null님 안녕하세요! 공지에 있는 규칙 필독해주세요."같은 이상한 메시지가 떠요<br>
->어...db오류인데 속도가 너무느려서 이전 Thread가 끝나지 못하고 db를 읽고있는데 다음 thread가 작동하면 그럴지도?(정확한 원인은 분석중 입니다!)<br>
