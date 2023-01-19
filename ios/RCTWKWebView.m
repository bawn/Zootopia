//
//  RCTWKWebView.m
//  Zootopia
//
//  Created by bawn on 20/10/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTWKWebView.h"
#import <React/RCTConvert.h>

#import <WebKit/WebKit.h>


@interface RCTWKWebView ()

@property (nonatomic, strong) WKWebView *webView;

@end

@implementation RCTWKWebView

- (instancetype)initWithFrame:(CGRect)frame{
  self = [super initWithFrame:frame];
  if (self) {
    self.webView = [[WKWebView alloc] initWithFrame:self.bounds];
    self.webView.allowsBackForwardNavigationGestures = YES;
    self.webView.allowsLinkPreview = YES;
//    self.webView.navigationDelegate = self;
    [self addSubview:self.webView];
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)


//- (NSMutableDictionary<NSString *, id> *)baseEvent{
//  NSDictionary *dic = @{
//                        @"url": self.webView.URL.absoluteString ?: @"",
//                        @"loading" : @(self.webView.loading),
//                        @"title": self.webView.title,
//                        @"canGoBack": @(self.webView.canGoBack),
//                        @"canGoForward" : @(self.webView.canGoForward),
//                        };
//  NSMutableDictionary<NSString *, id> *event = [[NSMutableDictionary alloc] initWithDictionary:dic];
//  return event;
//}

- (void)layoutSubviews{
  [super layoutSubviews];
  self.webView.frame = self.bounds;
}

- (void)setSource:(NSDictionary *)source{
  if ([_source isEqualToDictionary:source] || ![source isKindOfClass:[NSDictionary class]]) {
    return;
  }
  _source = source;
  NSString *html = [RCTConvert NSString:source[@"html"]];
  if (html) {
    NSURL *baseURL = [RCTConvert NSURL:source[@"baseUrl"]];
    if (!baseURL) {
      baseURL = [NSURL URLWithString:@"about:blank"];
    }
    [self.webView loadHTMLString:html baseURL:baseURL];
    return;
  }
  NSURLRequest *request = [RCTConvert NSURLRequest:source];
  if ([request.URL isEqual:self.webView.URL]) {
    return;
  }
  if (!request.URL) {
    [_webView loadHTMLString:@"" baseURL:nil];
    return;
  }
  [self.webView loadRequest:request];
}


- (void)dealloc{
  NSLog(@"%s", __func__);
}


@end
