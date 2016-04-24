var request = require('request'),
		cheerio = require('cheerio');

/**
	*
	*	getHTML
	*
	*	Gets the final HTML of an URL, tries to detect and elude scraping protection methods to find the final HTML target 
	*
	*	@param {String}	site  - Web site base URL
	*	@param {String}	path  - URL path to target
	*	@param {String} proxy - Proxy to use on requests
	*	@return {Promise} - Promise that will resolve to the target HTML or reject to a request error
	*
	*/

function getHTML(site, path, proxy) {
	return new Promise(function (fullfill, reject) {
		request({
			url: site+path,
			proxy: proxy,
			method: 'GET',
			headers: {
					'Connection': 'keep-alive',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
					'Upgrade-Insecure-Requests': '1',
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
					'DNT': "1",
					'Accept-Language': 'en-US,en;q=0.8'
			}
		}, function(error, response, html) {
			if (error) {
				reject(error);
			} else {
				$ = cheerio.load(html);
				var gaScript = $('script[defer]');
				if (!gaScript.length)
					fullfill(html);
				else {
					var gaUrl = gaScript.first().attr('src');
					request({
						url: site+gaUrl,
						proxy: proxy.host,
						method: 'GET',
						headers: {
								"Connection": "keep-alive",
								"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
								"Upgrade-Insecure-Requests": "1",
								"User-Agent": 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
								"DNT": "1",
								"Referer": site+path,
								"Accept-Language": "en-US,en;q=0.8"
						}
					}, function(error, response, html) {
						if (error)
								reject(error);
						else {
							xju = response.headers['x-ju'];
							xah = response.headers['x-ah'];
							request({
								url: site+xju,
								proxy: proxy.host,
								method: 'POST',
								headers: {
										'Connection': 'keep-alive',
										'Content-Length': '4547',
										'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
										'Origin': site,
										'X-Distil-Ajax': xah,
										'Content-Type': 'text/plain;charset=UTF-8',
										'Accept': '*/*',
										'DNT': '1',
										'Referer': site+path,
										'Accept-Language': 'en-US,en;q=0.8'
								},
								body: 'p=%7B%22appName%22%3A%22Netscape%22%2C%22platform%22%3A%22Win32%22%2C%22cookies%22%3A1%2C%22syslang%22%3A%22fr%22%2C%22userlang%22%3A%22fr%22%2C%22cpu%22%3A%22%22%2C%22productSub%22%3A%2220030107%22%2C%22plugins%22%3A%7B%220%22%3A%22WidevineContentDecryptionModule%22%2C%221%22%3A%22ShockwaveFlash%22%2C%222%22%3A%22ChromeRemoteDesktopViewer%22%2C%223%22%3A%22NativeClient%22%2C%224%22%3A%22ChromePDFViewer%22%2C%225%22%3A%22MicrosoftOffice2010%22%2C%226%22%3A%22MicrosoftOffice2010%22%2C%227%22%3A%22Java(TM)PlatformSE7U40%22%2C%228%22%3A%22GoogleUpdate%22%2C%229%22%3A%22ShockwaveFlash%22%2C%2210%22%3A%22JavaDeploymentToolkit7.0.400.43%22%7D%2C%22mimeTypes%22%3A%7B%220%22%3A%22WidevineContentDecryptionModuleapplication%2Fx-ppapi-widevine-cdm%22%2C%221%22%3A%22ShockwaveFlashapplication%2Fx-shockwave-flash%22%2C%222%22%3A%22FutureSplashPlayerapplication%2Ffuturesplash%22%2C%223%22%3A%22application%2Fvnd.chromium.remoting-viewer%22%2C%224%22%3A%22NativeClientExecutableapplication%2Fx-nacl%22%2C%225%22%3A%22PortableNativeClientExecutableapplication%2Fx-pnacl%22%2C%226%22%3A%22PortableDocumentFormatapplication%2Fpdf%22%2C%227%22%3A%22PortableDocumentFormatapplication%2Fx-google-chrome-print-preview-pdf%22%2C%228%22%3A%2214.0.4730.1010application%2Fx-msoffice14%22%2C%229%22%3A%22SharePointPlug-inforFirefoxapplication%2Fx-sharepoint%22%2C%2210%22%3A%22JavaAppletapplication%2Fx-java-applet%22%2C%2211%22%3A%22JavaBeansapplication%2Fx-java-bean%22%2C%2212%22%3A%22application%2Fx-java-vm%22%2C%2213%22%3A%22application%2Fx-java-applet%3Bversion%3D1.1.1%22%2C%2214%22%3A%22application%2Fx-java-bean%3Bversion%3D1.1.1%22%2C%2215%22%3A%22application%2Fx-java-applet%3Bversion%3D1.1%22%2C%2216%22%3A%22application%2Fx-java-bean%3Bversion%3D1.1%22%2C%2217%22%3A%22application%2Fx-java-applet%3Bversion%3D1.2%22%2C%2218%22%3A%22application%2Fx-java-bean%3Bversion%3D1.2%22%2C%2219%22%3A%22application%2Fx-java-applet%3Bversion%3D1.1.3%22%2C%2220%22%3A%22application%2Fx-java-bean%3Bversion%3D1.1.3%22%2C%2221%22%3A%22application%2Fx-java-applet%3Bversion%3D1.1.2%22%2C%2222%22%3A%22application%2Fx-java-bean%3Bversion%3D1.1.2%22%2C%2223%22%3A%22application%2Fx-java-applet%3Bversion%3D1.3%22%2C%2224%22%3A%22application%2Fx-java-bean%3Bversion%3D1.3%22%2C%2225%22%3A%22application%2Fx-java-applet%3Bversion%3D1.2.2%22%2C%2226%22%3A%22application%2Fx-java-bean%3Bversion%3D1.2.2%22%2C%2227%22%3A%22application%2Fx-java-applet%3Bversion%3D1.2.1%22%2C%2228%22%3A%22application%2Fx-java-bean%3Bversion%3D1.2.1%22%2C%2229%22%3A%22application%2Fx-java-applet%3Bversion%3D1.3.1%22%2C%2230%22%3A%22application%2Fx-java-bean%3Bversion%3D1.3.1%22%2C%2231%22%3A%22application%2Fx-java-applet%3Bversion%3D1.4%22%2C%2232%22%3A%22application%2Fx-java-bean%3Bversion%3D1.4%22%2C%2233%22%3A%22application%2Fx-java-applet%3Bversion%3D1.4.1%22%2C%2234%22%3A%22application%2Fx-java-bean%3Bversion%3D1.4.1%22%2C%2235%22%3A%22application%2Fx-java-applet%3Bversion%3D1.4.2%22%2C%2236%22%3A%22application%2Fx-java-bean%3Bversion%3D1.4.2%22%2C%2237%22%3A%22application%2Fx-java-applet%3Bversion%3D1.5%22%2C%2238%22%3A%22application%2Fx-java-bean%3Bversion%3D1.5%22%2C%2239%22%3A%22application%2Fx-java-applet%3Bversion%3D1.6%22%2C%2240%22%3A%22application%2Fx-java-bean%3Bversion%3D1.6%22%2C%2241%22%3A%22application%2Fx-java-applet%3Bversion%3D1.7%22%2C%2242%22%3A%22application%2Fx-java-bean%3Bversion%3D1.7%22%2C%2243%22%3A%22application%2Fx-java-applet%3Bjpi-version%3D1.7.0_40%22%2C%2244%22%3A%22application%2Fx-java-bean%3Bjpi-version%3D1.7.0_40%22%2C%2245%22%3A%22application%2Fx-java-vm-npruntime%22%2C%2246%22%3A%22application%2Fx-java-applet%3Bdeploy%3D10.40.2%22%2C%2247%22%3A%22application%2Fx-java-applet%3Bjavafx%3D2.2.40%22%2C%2248%22%3A%22application%2Fx-vnd.google.update3webcontrol.3%22%2C%2249%22%3A%22application%2Fx-vnd.google.oneclickctrl.9%22%2C%2250%22%3A%22AdobeFlashmovieapplication%2Fx-shockwave-flash%22%2C%2251%22%3A%22FutureSplashmovieapplication%2Ffuturesplash%22%2C%2252%22%3A%22application%2Fjava-deployment-toolkit%22%7D%2C%22screen%22%3A%7B%22width%22%3A1920%2C%22height%22%3A1200%2C%22colorDepth%22%3A24%7D%2C%22fonts%22%3A%7B%220%22%3A%22Calibri%22%2C%221%22%3A%22Cambria%22%2C%222%22%3A%22Constantia%22%2C%223%22%3A%22LucidaBright%22%2C%224%22%3A%22Georgia%22%2C%225%22%3A%22SegoeUI%22%2C%226%22%3A%22Candara%22%2C%227%22%3A%22TrebuchetMS%22%2C%228%22%3A%22Verdana%22%2C%229%22%3A%22Consolas%22%2C%2210%22%3A%22LucidaConsole%22%2C%2211%22%3A%22LucidaSansTypewriter%22%2C%2212%22%3A%22CourierNew%22%2C%2213%22%3A%22Courier%22%7D%7D'
							}, function(error, response, html) {
									if (error)
										reject(error);
									else {
										var cookie = response.headers['set-cookie'].map((cookie) => cookie.split(';')[0]).join('; ');
										request({
											url: site+path,
											proxy: proxy.host,
											method: "GET",
											headers: {
												"Connection": "keep-alive",
												"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
												"Upgrade-Insecure-Requests": "1",
												"User-Agent": 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
												"DNT": "1",
												"Referer": site+path,
												"Accept-Language": "en-US,en;q=0.8",
												"Cookie": cookie
											}
										}, function(error, response, html) {
											if (error)
												reject(error);
											else
												fullfill(html);
										});
									}
							});
						}
					});
				}
			}
		});
	});
}

module.exports = getHTML;
