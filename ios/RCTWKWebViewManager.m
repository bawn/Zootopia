//
//  RCTWKWebViewManager.m
//  Zootopia
//
//  Created by bawn on 20/10/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTWKWebViewManager.h"
#import "RCTWKWebView.h"

@implementation RCTWKWebViewManager

RCT_EXPORT_MODULE()

- (UIView *)view{
  RCTWKWebView *WKWebView = [[RCTWKWebView alloc] init];
  return WKWebView;
}

RCT_EXPORT_VIEW_PROPERTY(source, NSDictionary)


//- (void)dealloc{
//  NSLog(@"%s", __func__);
//}


@end
