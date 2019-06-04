#!/bin/sh

export RAC_AUTHORITY=${RAC_AUTHORITY}
export RAC_CLIENTID=${RAC_CLIENTID}
export RAC_REDIRECT_URI=${RAC_REDIRECT_URI}
export RAC_POST_LOGOUT=${RAC_POST_LOGOUT}
export RAC_SILENT_REDIRECT=${RAC_SILENT_REDIRECT}
export FB_APIKEY=${FB_APIKEY}
export FB_AUTHDOMAIN=${FB_AUTHDOMAIN}
export FB_DATABASE_URL=${FB_DATABASE_URL}
export FB_PROJECTID=${FB_PROJECTID}
export FB_STORAGEBUCKET=${FB_STORAGEBUCKET}
export FB_MSGSENDERID=${FB_MSGSENDERID}
export FB_APPID=${FB_APPID}
export FB_VAPIDKEY=${FB_VAPIDKEY}

sed -i "s,PLACE_HOLDER_RAC_AUTHORITY,${RAC_AUTHORITY}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_RAC_CLIENTID,${RAC_CLIENTID}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_RAC_REDIRECT_URI,${RAC_REDIRECT_URI}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_RAC_POST_LOGOUT,${RAC_POST_LOGOUT}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_RAC_SILENT_REDIRECT,${RAC_SILENT_REDIRECT}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_APIKEY,${FB_APIKEY}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_AUTHDOMAIN,${FB_AUTHDOMAIN}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_DATABASE_URL,${FB_DATABASE_URL}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_PROJECTID,${FB_PROJECTID}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_STORAGEBUCKET,${FB_STORAGEBUCKET}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_MSGSENDERID,${FB_MSGSENDERID}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_APPID,${FB_APPID}," /sources/config/config.json
sed -i "s,PLACE_HOLDER_FB_VAPIDKEY,${FB_VAPIDKEY}," /sources/config/config.json

exec "$@"
