import 'package:flutter/material.dart';

/// Owner: Flutter Dev B.
/// Shown when AppState.pendingPromptTier is "medium" or "high".
/// Keep language non-clinical — see conventions in README.
class EscalationPrompt extends StatelessWidget {
  final String tier; // "medium" | "high"
  final VoidCallback onOptIn;
  final VoidCallback onDismiss;

  const EscalationPrompt({
    super.key,
    required this.tier,
    required this.onOptIn,
    required this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    final message = tier == "high"
        ? "Would it help to talk to someone?"
        : "Want to connect with people who get it?";

    return AlertDialog(
      content: Text(message),
      actions: [
        TextButton(onPressed: onDismiss, child: const Text("Not now")),
        FilledButton(onPressed: onOptIn, child: const Text("Yes")),
      ],
    );
  }
}
