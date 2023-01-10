# チャットウェブアプリケーション(TEAM3)

<br>

## 目次

- [チャットウェブアプリケーション(TEAM3)](#チャットウェブアプリケーションteam3)
  - [目次](#目次)
  - [機能一覧](#機能一覧)
  - [社員権限](#社員権限)
    - [マネージャー](#マネージャー)
    - [リーダー](#リーダー)
    - [社員](#社員)
  - [利用方法](#利用方法)
    - [ログインページ](#ログインページ)
    - [エントランスページ(全体向けメッセージ)](#エントランスページ全体向けメッセージ)
    - [メニューバー](#メニューバー)
    - [ダイレクトメッセージページ](#ダイレクトメッセージページ)
    - [マイページ](#マイページ)
    - [管理用ページ(※マネージャーのみ)](#管理用ページマネージャーのみ)
  - [詳細仕様](#詳細仕様)
    - [全体向けメッセージ](#全体向けメッセージ)
    - [個人向けメッセージ](#個人向けメッセージ)
    - [グループ向けメッセージ](#グループ向けメッセージ)
    - [マイページ](#マイページ-1)
    - [管理用ページ(※マネージャーのみ)](#管理用ページマネージャーのみ-1)
    - [その他](#その他)
  - [製作者](#製作者)

<br>

## 機能一覧

このチャットウェブアプリケーションでは以下の機能が実装されています。

| ページ名                                                   | 説明                                                                                                             |
| :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| 全体向けメッセージ                                         | 全体のアナウンスなどをここで行うことができます。                                                                 |
| 個人向けメッセージ                                         | 個人同士でダイレクトメッセージを行うことができます。                                                             |
| グループ向けメッセージ                                     | 任意の名前のグループを作成してチャットを行うことができます。                                                     |
| マイページ                                                 | 個人情報(名前/ID/パスワード/役職)の確認、個人情報(名前/パスワード)の変更ができます。ここでログアウトも行います。 |
| 管理者用ページ(<font color="red">※マネージャーのみ</font>) | 社員の追加/削除/役職変更ができます。ただし、マネージャーに対しての役職変更/削除はできません。                    |

<br>

## 社員権限

### マネージャー

基本的に 1 人しかこの権限は保持しません。社員管理、グループの管理を行います。マネージャーのみ社員を追加/削除/役職変更をすることができます。

### リーダー

グループに対して一人ずつ割り当てられます。グループの管理を行います。

### 社員

社員には特別な権限は割り当てられていません。メッセージの送信を行うことができます。

<br>

## 利用方法

### ログインページ

このチャットウェブアプリケーションを利用するには事前に登録されている社員 ID とパスワードを入力してログインする必要があります。

<img src = "/uploads/7cb70f30cd80449aa8cc8ae7727878df/loginPage.png" width = "450">

<br>

### エントランスページ(全体向けメッセージ)

ログイン完了後は自動的に全体向けメッセージのページに飛ばされます。

全体向けメッセージでは会社内に伝達したいメッセージを記載されています。

<img src = "/uploads/72fa595bf8fd64c0bd60284585974ac5/entrancePage.png" width = "450">

<br>

### メニューバー

左上のメニューボタンを押すことでメニューバーが表示され、他のチャットへ遷移することができます。

<img src = "/uploads/f9d280e143b27b303afa2b0cbf4bae5a/menuPage-re.png" width = "450">

<br>

### ダイレクトメッセージページ

メニューバーからダイレクトメッセージメッセージへ遷移すると社員リストが表示されます。

<img src = "/uploads/c0120cdd71358bbed446b2a26dddc655/employeeListPage.png" width = "450">

画面右側のメッセージボタンを押すことでその社員とのダイレクトメッセージ画面に遷移され、個別のチャットを行うことができます。

<img src = "/uploads/7fd0adef45023c734375d67865288380/dmPage.png" width = "450">

<br>

### マイページ

右上のマイページボタンを押すことでマイページへ移動し、個人情報の確認/変更ができます。

<img src = "/uploads/a1ae22926b4ab269c705aedb9570d8f6/myPage-re.png" width = "450">

<br>

### 管理用ページ(※マネージャーのみ)

マネージャーの人のみ右上に社員管理のボタンを押すことができ、管理用ページで社員の追加/役職変更/削除を行うことができます。

<img src = "/uploads/808600159e8a203e64c3b9d6c4fe13bb/adminPage.png" width = "450">

<br>

## 詳細仕様

### 全体向けメッセージ

全体のアナウンスなどをここで行うことができます。画面下のメッセージ入力欄から任意のメッセージを全体向けに発信することが可能です。自分が送信したメッセージが右側に、自分以外の社員が送信したメッセージは左側に表示されます。また、送信されたメッセージには送信者の社員 ID、送信時刻も表示されます。

### 個人向けメッセージ

個人同士でダイレクトメッセージを行うことができます。個人向けメッセージページを開くと初めに、社員一覧が表示されます。

### グループ向けメッセージ

任意の名前のグループを作成してチャットを行うことができます。左のメニューバーの上にある＋ボタンをクリックすることでチャンネル作成ページへジャンプし、新たなグループを作成できます。作成されたグループはメニューバーの下部に追加されます。メッセージの配置は全体向けメッセージと同様です。

### マイページ

個人情報(名前/ID/パスワード/役職)の確認、個人情報(名前/パスワード)の変更ができます。ここでログアウトも行います。

### 管理用ページ(※マネージャーのみ)

社員の追加/削除/役職変更ができます。ただし、マネージャーに対しての役職変更/削除はできません。新たに社員を追加する場合は社員 ID、社員名、仮パスワード、役職を設定して作成します。なお、新たにマネージャーの役職を割り当てることは安全のために出来ないようにしています。

### その他

上の紺色のバーに自分の名前、社員 ID、現在のチャンネルが表示されます。

<br>

## 製作者

- 井口創史
- 江馬龍之介
- 平出陽一
- 定別當浩輝
- 加藤悠希
