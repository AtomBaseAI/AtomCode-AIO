#include <bits/stdc++.h>
using namespace std;

int meetings_in_slot(const std::vector<std::pair<int,int>>& meetings, int s, int e) {
    int count = 0;
    for (const auto& m : meetings)
        if (m.first >= s && m.second <= e) count++;
    return count;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> meetings(n);
    for (auto& p : meetings) cin >> p.first >> p.second;
    int s, e;
    cin >> s >> e;
    cout << meetings_in_slot(meetings, s, e) << "\n";
    return 0;
}
