#include <bits/stdc++.h>
using namespace std;

long long rod_revenue(long long L, const std::vector<long long>& price) {
    std::vector<long long> dp(L + 1, 0);
    for (long long len = 1; len <= L; len++) {
        long long best = 0;
        for (long long cut = 1; cut <= len; cut++) {
            long long cand = price[cut - 1] + dp[len - cut];
            if (cand > best) best = cand;
        }
        dp[len] = best;
    }
    return dp[L];
}

int main() {
    long long L;
    if (!(cin >> L)) return 0;
    vector<long long> price(L);
    for (auto& x : price) cin >> x;
    cout << rod_revenue(L, price) << "\n";
    return 0;
}
