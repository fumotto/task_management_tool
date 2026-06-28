個人的な勉強のために作っているタスク管理アプリです。

## 概要

ユーザー認証付きの TODO 管理 Web アプリケーションです。フロントエンドとバックエンドを分離した構成で、Docker Compose によるローカル開発・本番デプロイを想定しています。

## 主な機能

- **ユーザー認証**: アカウント作成、ログイン、ログアウト（Passport Local Strategy + Redis セッション）
- **TODO 管理**: タスクの一覧表示、追加、ドラッグ＆ドロップによる優先度の並び替えと一括保存
- **ユーザー単位のデータ分離**: ログインユーザーごとにタスクを管理

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| フロントエンド | Gatsby 5, React 18, TypeScript, Tailwind CSS, react-beautiful-dnd |
| バックエンド | Express, TypeScript, Sequelize, PostgreSQL, Redis, Passport, bcrypt |
| インフラ | Docker Compose, nginx（本番） |
| API 仕様 | OpenAPI 3.0（Swagger） |
| テスト | Jest, supertest |

## プロジェクト構成

```
workspace/
├── front/gatsby/              # Gatsby フロントエンド
│   └── src/
│       ├── pages/             # ページ（ホーム、TODO 一覧など）
│       └── components/        # 共通コンポーネント（レイアウト、ログイン UI）
├── back/express-api/          # Express REST API
│   └── src/
│       ├── login/             # 認証ロジック・ルート
│       ├── todolist/          # TODO ロジック・ルート
│       └── db/                # Sequelize モデル・リポジトリ
├── back/swagger/              # OpenAPI 定義
├── nginx/                     # リバースプロキシ設定
├── docker-compose.yml         # 開発用（PostgreSQL, Redis, Swagger）
└── docker-compose_production.yml  # 本番用（nginx, API, DB）
```

## 起動方法

### 開発環境

```bash
# インフラ（PostgreSQL, Redis, Swagger）を起動
npm start

# フロントエンド（別ターミナル）
cd front/gatsby && npm run develop

# バックエンド（別ターミナル）
cd back/express-api && npm run start
```

### 本番相当

```bash
docker compose -f docker-compose_production.yml up -d
```

本番構成では nginx（ポート 8080）が静的ファイル配信と `/api/` への API プロキシを担当します。

## API エンドポイント

| メソッド | パス | 説明 |
|---------|------|------|
| POST | `/api/signup` | ユーザー登録 |
| POST | `/api/login` | ログイン |
| GET | `/api/isLogined` | ログイン状態確認 |
| GET | `/api/logout` | ログアウト |
| GET | `/api/tasks/Todo/` | TODO 一覧取得（要認証） |
| PUT | `/api/tasks/Todo/new/` | TODO 追加（要認証） |
| PUT | `/api/tasks/Todo/update/bulk/` | 優先度一括更新（要認証） |

## データモデル

- **user_account**: ユーザー（loginid, name, password, enable）
- **tasks**: タスク（title, loginid, status, priority）
  - status: `未着手` / `進行中` / `停止中` / `レビュー中` / `終了`
