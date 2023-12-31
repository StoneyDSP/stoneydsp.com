```
"headers": [
		{
			"source": "/(.html)",
			"headers": [
				{
					"key": "Referrer-Policy",
					"value": "origin-when-cross-origin"
				},
				{
					"key": "Access-Control-Allow-Origin",
					"value": "*"
				},
				{
					"key": "Access-Control-Allow-Headers",
					"value": "authorization, x-client-info, apikey, content-type"
				},
				{
					"key": "Access-Control-Allow-Methods",
					"value": "POST, GET, OPTIONS"
				},
				{
					"key": "Access-Control-Allow-Methods",
					"value": "*"
				},
				{
					"key": "X-UA-Compatible",
					"value": "ie-edge"
				},
				{
					"key": "Vercel-CDN-Cache-Control",
					"value": "max-age=3600"
				},
				{
					"key": "CDN-Cache-Control",
					"value": "max-age=60"
				},
				{
					"key": "Cache-Control",
					"value": "public, max-age=10, s-maxage=86400, immutable"
				},
				{
					"key": "X-DNS-Prefetch-Control",
					"value": "on"
				},
				{
					"key": "X-XSS-Protection",
					"value": "1; mode=block"
				},
				{
					"key": "Strict-Transport-Security",
					"value": "max-age=63072000; includeSubDomains; preload"
				}
			]
		},
		{
			"source": "github-readme-stats.vercel.app/(.*)",
			"headers": [
				{
					"key": "Vercel-CDN-Cache-Control",
					"value": "max-age=3600"
				},
				{
					"key": "CDN-Cache-Control",
					"value": "max-age=60"
				},
				{
					"key": "Cache-Control",
					"value": "public, max-age=10, s-maxage=86400, immutable"
				},
				{
					"key": "X-XSS-Protection",
					"value": "1; mode=block"
				}
			]
		},
        {
			"source": "/(.*)",
			"headers": [
				{
					"key": "X-Content-Type-Options",
					"value": "nosniff"
				},
				{
					"key": "X-Frame-Options",
					"value": "DENY"
				}
			]
		},
		{
			"source": "/public/(.*)",
			"headers": [
				{
					"key": "Access-Control-Allow-Origin",
					"value": "*"
				}
			]
		},
		{
			"source": "/:path*",
			"has": [
				{
					"type": "query",
					"key": "authorized"
				}
			],
		  "headers": [
				{
					"key": "x-authorized",
					"value": "true"
				}
			]
		},
		{
			"source": "/:path*",
			"missing": [
				{
					"type": "query",
					"key": "authorized"
				}
			],
		  "headers": [
				{
					"key": "x-authorized",
					"value": "false"
				}
			]
		}
	]
```
