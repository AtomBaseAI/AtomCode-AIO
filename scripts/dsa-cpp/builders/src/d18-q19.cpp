#include <bits/stdc++.h>
using namespace std;

long long job_profit(std::vector<std::pair<int,int>> jobs) {
    int max_deadline = 0;
    for (const auto& j : jobs)
        if (j.first > max_deadline) max_deadline = j.first;
    std::sort(jobs.begin(), jobs.end(),
              [](const std::pair<int,int>& a, const std::pair<int,int>& b) {
                  return a.second > b.second;
              });
    std::vector<int> slot(max_deadline + 1, -1);
    long long total = 0;
    for (const auto& j : jobs)
        for (int t = j.first < max_deadline ? j.first : max_deadline; t >= 1; t--)
            if (slot[t] == -1) { slot[t] = j.second; total += j.second; break; }
    return total;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<pair<int,int>> jobs(n);
    for (auto& p : jobs) cin >> p.first >> p.second;
    cout << job_profit(jobs) << "\n";
    return 0;
}
