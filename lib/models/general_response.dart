import 'package:flutter/cupertino.dart';

class GeneralResponse {
  final int statusCode;
  final String message;

  GeneralResponse({
    @required this.statusCode,
    @required this.message,
  });
  static GeneralResponse success() =>
      GeneralResponse(statusCode: 200, message: '');

  static GeneralResponse unknownError() =>
      GeneralResponse(statusCode: 1000, message: '');
}
