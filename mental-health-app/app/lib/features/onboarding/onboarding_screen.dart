import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../core/api_client.dart';
import '../../core/app_state.dart';

/// Owner: whoever is assigned onboarding (often Flutter Lead, Day 1).
/// Non-clinical, plain-language consent screen — see project conventions
/// in README before changing this copy.
class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  Future<void> _continue(BuildContext context) async {
    final res = await ApiClient.instance.post("/auth/signup", {"consent_status": true});
    await ApiClient.instance.saveToken(res["access_token"]);
    // TODO: decode token or call /auth/me to get real user_id
    if (context.mounted) {
      context.read<AppState>().setUser("placeholder_user_id");
      Navigator.pushReplacementNamed(context, "/home");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("Welcome", style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: 16),
            const Text(
              "This app learns from how you play, write, and speak to gently "
              "check in on you and connect you to support if you ever want "
              "it. Your entries are private and never shared without your "
              "choice.",
            ),
            const SizedBox(height: 32),
            FilledButton(
              onPressed: () => _continue(context),
              child: const Text("Continue"),
            ),
          ],
        ),
      ),
    );
  }
}
