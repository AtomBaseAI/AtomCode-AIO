#include <bits/stdc++.h>
using namespace std;

double fractional_knapsack(std::vector<std::pair<int,int>> items, int capacity) {
    double total = 0.0;
    int remaining = capacity;
    std::vector<int> taken(items.size(), 0);
    for (int step = 0; step < (int)items.size() && remaining > 0; step++) {
        int pick = -1;
        for (int i = 0; i < (int)items.size(); i++) {
            if (taken[i]) continue;
            if (pick == -1) { pick = i; continue; }
            /* items[i] has a better value-per-weight ratio than items[pick] */
            if ((long long)items[i].second * items[pick].first >
                (long long)items[pick].second * items[i].first)
                pick = i;
        }
        taken[pick] = 1;
        if (items[pick].first <= remaining) {
            total += items[pick].second;
            remaining -= items[pick].first;
        } else {
            total += (double)items[pick].second * remaining / items[pick].first;
            remaining = 0;
        }
    }
    return total;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> items(n);
    for (auto& p : items) cin >> p.first >> p.second;
    int capacity;
    cin >> capacity;
    double best = fractional_knapsack(items, capacity);
    cout << fixed << setprecision(2) << best << "\n";
    return 0;
}
