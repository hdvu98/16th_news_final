create database News;
use News;
#Tao bang tai khoan
#Type_account 0 :doc gia, 1: writter, 2:admin
#status_account: trang thai cua tai khoan, 0:exits, 1: not exist
#Vip : 0: not vip, 1: vip
create table ACCOUNT
(
IDAccount int auto_increment  not null,
Username nvarchar(60) not null,
Email nvarchar(60) not null,
Pass nvarchar(60) not null,
Status_account int not null,
Type_account int not null,
Vip int not null,
constraint PK_TK primary key (IDAccount)
);

#Tao bang thu muc cha
#status_cate: trang thai cua muc, 0:exits, 1: not exist
create table CATE_PARENTS
(
IDCate_Parents int auto_increment  not null,
Name_parentscate nvarchar(60) not null,
Status_parentscate int not null,
constraint PK_TK primary key (IDCate_Parents)
);

#Tao bang thu muc con
#Status_childcate: trang thai cua muc, 0:exits, 1: not exist
create table CATE_CHILD
(
IDCate_Child int auto_increment  not null,
FKIDCate_Parents int not null,
Name_childcate nvarchar(60) not null,
Status_childcate int not null,
constraint PK_TK primary key (IDCate_Child)
);

#Tao bang Tag
create table TAG
(
IDTAG int auto_increment  not null,
Name_tag nvarchar(60) not null,
constraint PK_TK primary key (IDTAG)
);

#Tao bang bai viet
#Status_post: trang thai bai viet, 0: published, 1:accepted,2:Pendding, 3: denied
#Thubnail: luu dia chi anh thumbnail cua bai viet
#Type_of_post: loai bai viet, 0: normal, 1: VIP
#Anh trong bai viet se duoc luu trong bang khac (FK)
create table POST
(
IDPost int auto_increment  not null,
Title nvarchar(300) not null,
Thumbnail nvarchar(60) not null,
Status_post int not null,
FKCategory int not null,
FKIDWritter_post int not null,
FKTag int not null,
DateComplete datetime not null,
Content nvarchar (1000) not null,
Num_of_View int not null,
Num_of_Like int not null,
Num_of_Comment int not null,
Type_of_post int not null,
constraint PK_TK primary key (IDPost)
);

#tao bang picture
#URL : luu lien ket toi anh, de nghi la luu static file trong project
create table PICTURE
(
IDPic int auto_increment  not null,
URL nvarchar(60) not null,
FKIDPost int not null,
constraint PK_TK primary key (IDPic)
);

#tao bang comment
create table POSTCOMMENT
(
IDComment int auto_increment  not null,
FKIDPost int not null,
FKIDUser int not null,
ContentComment nvarchar(1000) not null,
Like_of_Comment int not null,
constraint PK_TK primary key (IDComment)
);

#tao bang reply of comment
create table REPLYCOMMENT
(
IDReply int auto_increment  not null,
FKIDComment int not null,
FKIDUser int not null,
ContentReplyComment nvarchar(1000) not null,
Like_of_ReplyComment int not null,
constraint PK_TK primary key (IDReply)
);

#Add foreign key mysql
ALTER TABLE REPLYCOMMENT ADD CONSTRAINT FK_RPCOMM_COMM FOREIGN KEY (FKIDComment) REFERENCES POSTCOMMENT(IDComment);
ALTER TABLE REPLYCOMMENT ADD CONSTRAINT FK_RPCOMM_ACC FOREIGN KEY (FKIDUser) REFERENCES ACCOUNT(IDAccount);

ALTER TABLE POSTCOMMENT ADD CONSTRAINT FK_COMM_ACC FOREIGN KEY (FKIDUser) REFERENCES ACCOUNT(IDAccount);
ALTER TABLE POSTCOMMENT ADD CONSTRAINT FK_COMM_POST FOREIGN KEY (FKIDPost) REFERENCES POST(IDPost);

ALTER TABLE PICTURE ADD CONSTRAINT FK_PIC_POST FOREIGN KEY (FKIDPost) REFERENCES POST(IDPost);

ALTER TABLE POST ADD CONSTRAINT FK_POST_CATE FOREIGN KEY (FKCategory) REFERENCES CATE_CHILD(IDCate_Child);
ALTER TABLE POST ADD CONSTRAINT FK_POST_ACC FOREIGN KEY (FKIDWritter_post) REFERENCES ACCOUNT(IDAccount);
ALTER TABLE POST ADD CONSTRAINT FK_POST_TAG FOREIGN KEY (FKTag) REFERENCES TAG(IDTAG);

ALTER TABLE CATE_CHILD ADD CONSTRAINT FK_CATECHILD_CATEPARENTS FOREIGN KEY (FKIDCate_Parents) REFERENCES CATE_PARENTS(IDCate_Parents);


	