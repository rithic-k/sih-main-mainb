import 'package:flutter/material.dart';

/// Owner: Flutter Dev B.
/// TODO: "Connect Steam account" flow -> POST /games/steam/sync
class GamesScreen extends StatelessWidget {
  const GamesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Play")),
      body: const Center(child: Text("Games screen — build here")),
    );
  }
}
