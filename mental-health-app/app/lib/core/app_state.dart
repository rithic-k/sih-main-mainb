import 'package:flutter/foundation.dart';

/// Shared app-wide state. Features read/update this instead of holding
/// their own duplicate copies of user_id, pending prompts, etc.
class AppState extends ChangeNotifier {
  String? userId;
  String? pendingPromptTier; // "medium" | "high" | null

  void setUser(String id) {
    userId = id;
    notifyListeners();
  }

  void setPendingPrompt(String? tier) {
    pendingPromptTier = tier;
    notifyListeners();
  }

  void clearPrompt() {
    pendingPromptTier = null;
    notifyListeners();
  }
}
