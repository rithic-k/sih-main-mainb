import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/app_state.dart';
import 'features/onboarding/onboarding_screen.dart';
import 'features/journal/journal_screen.dart';
import 'features/goals/goals_screen.dart';
import 'features/games/games_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AppState(),
      child: const WellnessApp(),
    ),
  );
}

class WellnessApp extends StatelessWidget {
  const WellnessApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Wellness Companion",
      theme: ThemeData(useMaterial3: true, colorSchemeSeed: Colors.teal),
      // TODO(Flutter Lead): route to OnboardingScreen only on first launch,
      // otherwise go straight to HomeShell once a token exists.
      home: const OnboardingScreen(),
      routes: {
        "/home": (_) => const HomeShell(),
      },
    );
  }
}

/// The single shell every feature lives inside — this is what makes it
/// "one app" rather than separate screens stitched together.
class HomeShell extends StatefulWidget {
  const HomeShell({super.key});

  @override
  State<HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<HomeShell> {
  int _index = 0;

  final _screens = const [
    JournalScreen(),
    GoalsScreen(),
    GamesScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        onDestinationSelected: (i) => setState(() => _index = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.edit_note), label: "Journal"),
          NavigationDestination(icon: Icon(Icons.flag_outlined), label: "Goals"),
          NavigationDestination(icon: Icon(Icons.sports_esports_outlined), label: "Play"),
        ],
      ),
    );
  }
}
