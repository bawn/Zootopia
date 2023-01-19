//
//  PingppPay.m
//  Zootopia
//
//  Created by bawn on 10/11/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "PingppPay.h"
#import <Pingpp/Pingpp.h>
#import <React/RCTLog.h>

#import <Pingpp.h>

@interface PingppPay ()

@end


@implementation PingppPay

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(payWithCharge:(NSDictionary *)charge callback:(RCTResponseSenderBlock)callback) {
  [Pingpp createPayment:charge
         viewController:nil
           appURLScheme:@"Shopman"
         withCompletion:^(NSString *result, PingppError *error) {
           
           if (callback) {
             callback(@[result]);
           }
         }];
}

@end
