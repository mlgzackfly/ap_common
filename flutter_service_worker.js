'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "main.dart.js_3.part.js": "97e1db896cbee50f8af430782faa4d33",
"favicon.ico": "7db418a94cf88b41bc22e274a39a9112",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"main.dart.js": "68c43f8d70289ea9be5729219e200e72",
"version.json": "b88e64fecf85c96634c653e2683d4b71",
"main.dart.js_2.part.js": "6d043293ee9d4962ea94cc8e1a37c2a3",
"manifest.json": "e3544538ffa9733454cdcfe84a0052b4",
"main.dart.js_1.part.js": "5a37ae4b9b192fb6e6639dbbee80cc1e",
"icons/Icon-512.png": "300e5d3a398bc58a95de678decddda39",
"icons/Icon-192.png": "c6f1fbe2f7298bc5b9de50115b4c675d",
"assets/NOTICES": "7dd4b8791d955d5f01ad4a41b9c3ff86",
"assets/AssetManifest.json": "ddd11ef41baf3681004be10889acc875",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/assets/images/section_jiangong.webp": "7c96a64e3ba20d55d37bb73c16e63d6d",
"assets/assets/images/kuasap2.webp": "534201f2529ea74ae1256b4c24d760b6",
"assets/assets/images/kuasap3.webp": "8f3ad6f20518bcaca760eaad341ff63a",
"assets/assets/images/K.webp": "b5282cfbb87d76d24f82745357aedcde",
"assets/assets/images/section_first2.webp": "7b073c7d07ad1fd4d858c8e8b9031b9d",
"assets/assets/images/kuasap_text.webp": "eb2eb2e99c8580fb9ff656de920c5742",
"assets/assets/images/kuasap.webp": "1cd641961a31024e387699f0b6e046fc",
"assets/assets/images/section_qijin.webp": "f2a896089897436f6c44b4fb57a6f6fa",
"assets/assets/images/section_yanchao.webp": "c654b2abef56dbf8fec81adc5dc718ad",
"assets/assets/images/section_first1.webp": "7869ad4259db5e81c43f72efb57e8ea6",
"assets/assets/images/drawer-icon.webp": "22c87aae3602816ad4f8d2151d132117",
"assets/assets/images/section_nanzi.webp": "5685b7e80bb1bb08185c0a6005ed515d",
"assets/assets/notifications.json": "c7bd6350f8e6d3ed2788eaff71b956e7",
"assets/assets/coursetable.json": "c7b2ecfdc135f36b515f9b6088df8660",
"assets/assets/semesters.json": "3cef353243f9918a2096f7a220a98109",
"assets/assets/user_info.json": "f6b5f245a2a1cde332a94739842b0177",
"assets/assets/scores.json": "b612e6a3265548bf7fbc53a043e37502",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/packages/ap_common/assets/images/dash_line_light.webp": "ac0f479db7ab22ebf7e2a04a5c17b74e",
"assets/packages/ap_common/assets/images/nkutst_itc.webp": "39be02173d8ce4add0e5f987ed1c0e4d",
"assets/packages/ap_common/assets/images/dash_line_dark.webp": "496ec80bebb732e39bc822082344bfef",
"assets/packages/ap_common/assets/images/email.webp": "2315a6976d77044aa5c20e05b4c5c21c",
"assets/packages/ap_common/assets/images/drawer_background_dark.webp": "6fcbe652fd6c285eb60996875fdc076f",
"assets/packages/ap_common/assets/images/github.webp": "79ff1629aa4f57c767b7fe163743ddf4",
"assets/packages/ap_common/assets/images/fb.webp": "a2798761b05c0b389ba03920fb9c9fe5",
"assets/packages/ap_common/assets/images/drawer_background_light.webp": "bfd35bb1208613a9dda8cea3261ee813",
"assets/packages/ap_common/assets/icons/calendar_import.png": "30085b26b9ff01989965276970dea537",
"assets/packages/ap_common/assets/icons/qrcode.png": "8639d3523c7b695a4d18b06f9e31ec1a",
"assets/packages/ap_common/assets/icons/barcode.png": "38db3163e28387c37b02078bd1c9dd8d",
"index.html": "a704a01f7f2d3f315d680ead2b137c09",
"/": "a704a01f7f2d3f315d680ead2b137c09"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
