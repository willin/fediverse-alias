# Fediverse Aliases Service

## Useage

### Step 1: Init

Fork/Clone this repo:

```
git clone https://github.com/willin/fediverse-alias.git
```

### Step 2: Config

- Change Domain Routes
- Change Database ID

Edit `wrangler.toml`:

```toml
name = "fediverse-alias"
compatibility_date = "2023-01-01"

# change these to your own domain
routes = [
	{ pattern = "log.lu/.well-known/webfinger*", zone_name = "log.lu" },
  { pattern = "js.cool/.well-known/webfinger*", zone_name = "js.cool" },
  { pattern = "v0.chat/.well-known/webfinger*", zone_name = "v0.chat" },
  { pattern = "xn--wkua.xn--6qq986b3xl/.well-known/webfinger*", zone_name = "xn--wkua.xn--6qq986b3xl" },
  { pattern = "sh.gg/.well-known/webfinger*", zone_name = "sh.gg" },
  { pattern = "css.fund/.well-known/webfinger*", zone_name = "css.fund" },
  { pattern = "kaiyuan.fund/.well-known/webfinger*", zone_name = "kaiyuan.fund" },
  { pattern = "v0.md/.well-known/webfinger*", zone_name = "v0.md" },
  { pattern = "willin.org/.well-known/webfinger*", zone_name = "willin.org" },
  { pattern = "willin.wang/.well-known/webfinger*", zone_name = "willin.wang" }
]

[[d1_databases]]
binding = "DB"
database_name = "dns"
# change database_id into yours
database_id = "20204091-f55f-430d-a100-2292d8ea305a"
```

- Init seed data

Edit `migrations/0011_seeds.sql`:

```sql
-- Here is an example
INSERT INTO aliases(`alias`,`account`,`owner`) VALUES('i@v0.md','willin@log.lu','');
INSERT INTO aliases(`alias`,`account`,`owner`) VALUES('i@sh.gg','willin@log.lu','');
INSERT INTO aliases(`alias`,`account`,`owner`) VALUES('i@js.cool','willin@log.lu','');
```

### Step 3: Deploy

```bash
npm run deploy
npm run migration
```

## 赞助 Sponsor

如果您对本项目感兴趣，可以通过以下方式支持我：

- 关注我的 Github 账号：[@willin](https://github.com/willin) [![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Followers)](https://github.com/willin)
- 参与 [爱发电](https://afdian.net/@willin) 计划
- 支付宝或微信[扫码打赏](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)

Donation ways:

- Github: <https://github.com/sponsors/willin>
- Paypal: <https://paypal.me/willinwang>
- Alipay or Wechat Pay: [QRCode](https://user-images.githubusercontent.com/1890238/89126156-0f3eeb80-d516-11ea-9046-5a3a5d59b86b.png)

## 许可证 License

Apache-2.0
