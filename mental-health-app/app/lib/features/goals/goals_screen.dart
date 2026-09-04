import 'package:flutter/material.dart';

/// Owner: Flutter Dev A.
/// TODO: list goals (GET /goals/{user_id}), add goal (POST /goals),
/// mark complete (POST /goals/{goal_id}/complete)
class GoalsScreen extends StatelessWidget {
  const GoalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Goals")),
      body: const Center(child: Text("Goals screen — build here")),
    );
  }
}
