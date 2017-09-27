# コンテナ終了
down:
	docker-compose down

# コンテナ強制終了
kill:
	docker-compose kill

# リスタート
restart:
	docker-compose restart

# ビルド
build:
	docker-compose build --no-cache

# 起動
up:
	docker-compose up -d

# テーブル生成
migration:
	docker exec -it app ./ace migration:refresh

# シード生成
seed:
	docker exec -it app ./ace db:seed

# standard --fix
fixer:
	npm run fixer

#  standard
lint:
	npm run lint

# test
test:
	docker exec -it app ./ace migration:refresh
	docker exec -it app ./ace db:seed
	docker exec -it app npm test

# nyan
nyan:
	docker exec -it app ./ace migration:refresh
	docker exec -it app ./ace db:seed
	docker exec -it app npm run nyan