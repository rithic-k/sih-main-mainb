import 'package:flutter/material.dart';

/// Owner: Flutter Dev A.
/// TODO: text entry field -> POST /journal/text
/// TODO: voice recorder (record package) -> POST /journal/voice
class JournalScreen extends StatelessWidget {
  const JournalScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Reflect")),
      body: const Center(child: Text("Journal screen — build here")),
    );
  }
}
