## 2. manifest.json
- manifest.json

	>`/bootcamp-2019/bootcamp-app/src/main/resources/manifest.json`

	```
	{
		"required_version": "4.0",
		"app_version": "1.0.0",
		"bundle_symbolic_name": "com.logpresso.bootcamp",
		"app_names": {
			"ko": "bootcamp",
			"en": "bootcamp"
		},
		"programs": [
			{
				"program_names": {         //대메뉴에 추가되는 메뉴 이름
					"ko": "program_names", 
					"en": "bootcamp"
				},
				"program_id": "bootcamp",  //angular.json의  outputPath 폴더명
				"program_profiles": [
					"all",
					"admin",
					"member"
				]
			}
		],
		"app_id": "app_id", //서블렛에서 URL 맵핑
		"bundle_version": "1.0.0"
	}
	```
