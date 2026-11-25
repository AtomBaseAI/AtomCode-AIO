#include <bits/stdc++.h>
using namespace std;

int removals_needed(std::vector<std::pair<int,int>> meetings) {
    std::sort(meetings.begin(), meetings.end(),
              [](const std::pair<int,int>& a, const std::pair<int,int>& b) {
                  return a.second < b.second;
              });
    int removed = 0;
    long long keep_end = -(1LL << 60);
    for (const auto& m : meetings) {
        if (m.first >= keep_end) keep_end = m.second;
        else removed++;
    }
    return removed;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> meetings(n);
    for (auto& p : meetings) cin >> p.first >> p.second;
    cout << removals_needed(meetings) << "\n";
    return 0;
}
