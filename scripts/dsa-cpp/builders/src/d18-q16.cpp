#include <bits/stdc++.h>
using namespace std;

int max_activities(std::vector<std::pair<int,int>> acts) {
    std::sort(acts.begin(), acts.end(),
              [](const std::pair<int,int>& a, const std::pair<int,int>& b) {
                  return a.second < b.second;
              });
    int count = 0;
    long long last_end = -(1LL << 60);
    for (const auto& a : acts)
        if (a.first >= last_end) {
            count++;
            last_end = a.second;
        }
    return count;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> acts(n);
    for (auto& p : acts) cin >> p.first >> p.second;
    cout << max_activities(acts) << "\n";
    return 0;
}
