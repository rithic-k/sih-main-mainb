import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

/// Single shared HTTP client. Every feature (journal, goals, games) should
/// use this instead of calling `http` directly, so auth headers and base
/// URL stay consistent across the app.
class ApiClient {
  ApiClient._internal();
  static final ApiClient instance = ApiClient._internal();

  // TODO: swap for the deployed backend URL before demo day.
  static const String baseUrl = "http://localhost:8000";

  final _storage = const FlutterSecureStorage();

  Future<String?> _token() => _storage.read(key: "access_token");

  Future<void> saveToken(String token) =>
      _storage.write(key: "access_token", value: token);

  Future<Map<String, String>> _headers() async {
    final token = await _token();
    return {
      "Content-Type": "application/json",
      if (token != null) "Authorization": "Bearer $token",
    };
  }

  Future<dynamic> get(String path) async {
    final res = await http.get(Uri.parse("$baseUrl$path"), headers: await _headers());
    return _handle(res);
  }

  Future<dynamic> post(String path, Map<String, dynamic> body) async {
    final res = await http.post(
      Uri.parse("$baseUrl$path"),
      headers: await _headers(),
      body: jsonEncode(body),
    );
    return _handle(res);
  }

  dynamic _handle(http.Response res) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (res.body.isEmpty) return null;
      return jsonDecode(res.body);
    }
    throw Exception("API error ${res.statusCode}: ${res.body}");
  }
}
